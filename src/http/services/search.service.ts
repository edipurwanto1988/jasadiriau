import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";

export const getSearch = (q: URLSearchParams) => {
  const sql = Prisma.sql`
  WITH search AS (
  SELECT bp.id AS entity_id,
      bp.business_name AS name,
      bp.slug,
      bp.description,
      bp.business_name AS profile_name,
      bp.slug AS profile_slug,
      NULL::integer AS price,
      'profile'::text AS type,
      NULL::integer AS category_id,
      NULL::text AS category_name,
      NULL::text AS category_slug,
      COALESCE(json_agg(DISTINCT jsonb_build_object(
        'whatsapp', bc.whatsapp_number
      )), '[]') AS contacts,
      json_agg(
        jsonb_build_object(
          'province_id', prov.id,
          'province_slug', prov.slug,
          'province_name', prov.name,
          'regency_id', reg.id,
          'regency_slug', reg.slug,
          'regency_name', reg.name,
          'district_id', dist.id,
          'district_slug', dist.slug,
          'district_name', dist.name,
          'rank', CASE
                    WHEN $1 = '' OR $1 IS NULL THEN 0
                    ELSE ts_rank(
                      setweight(to_tsvector('simple', coalesce(prov.name,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(reg.name,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(dist.name,'')), 'D'),
                      plainto_tsquery('simple', $1)
                    )
                  END
        )
        ORDER BY CASE
                   WHEN $1 = '' OR $1 IS NULL THEN 0
                   ELSE ts_rank(
                     setweight(to_tsvector('simple', coalesce(prov.name,'')), 'C') ||
                     setweight(to_tsvector('simple', coalesce(reg.name,'')), 'C') ||
                     setweight(to_tsvector('simple', coalesce(dist.name,'')), 'D'),
                     plainto_tsquery('simple', $1)
                   )
                 END DESC
      ) FILTER (WHERE prov.id IS NOT NULL) AS locations,
      (
        setweight(to_tsvector('simple', coalesce(bp.business_name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(bp.description, '')), 'B') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT prov.name, ' ')), 'C') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT reg.name, ' ')), 'C') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT dist.name, ' ')), 'D')
      ) AS document,
      string_agg(DISTINCT CONCAT(prov.name, ',', reg.name, ',', dist.name), ',') AS location_text
  FROM business_profiles bp
  LEFT JOIN business_locations bl ON bl.profile_id = bp.id
  LEFT JOIN business_contacts bc ON bc.profile_id = bp.id
  LEFT JOIN provinces prov ON prov.id = bl.province_id
  LEFT JOIN regencies reg ON reg.id = bl.regency_id
  LEFT JOIN districts dist ON dist.id = bl.district_id
  GROUP BY bp.id, bp.business_name, bp.slug, bp.description

  UNION ALL

  SELECT s.id AS entity_id,
      s.name,
      s.slug,
      s.description,
      bp.business_name AS profile_name,
      bp.slug AS profile_slug,
      s.price::INTEGER AS price,
      'service'::text AS type,
      c.id AS category_id,
      c.name AS category_name,
      c.slug AS category_slug,
      COALESCE(json_agg(DISTINCT jsonb_build_object(
        'whatsapp', bc.whatsapp_number
      )), '[]') AS contacts,
      json_agg(
        jsonb_build_object(
          'province_id', prov.id,
          'province_slug', prov.slug,
          'province_name', prov.name,
          'regency_id', reg.id,
          'regency_slug', reg.slug,
          'regency_name', reg.name,
          'district_id', dist.id,
          'district_slug', dist.slug,
          'district_name', dist.name,
          'rank', CASE
                    WHEN $1 = '' OR $1 IS NULL THEN 0
                    ELSE ts_rank(
                      setweight(to_tsvector('simple', coalesce(prov.name,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(reg.name,'')), 'C') ||
                      setweight(to_tsvector('simple', coalesce(dist.name,'')), 'D'),
                      plainto_tsquery('simple', $1)
                    )
                  END
        )
        ORDER BY CASE
                   WHEN $1 = '' OR $1 IS NULL THEN 0
                   ELSE ts_rank(
                     setweight(to_tsvector('simple', coalesce(prov.name,'')), 'C') ||
                     setweight(to_tsvector('simple', coalesce(reg.name,'')), 'C') ||
                     setweight(to_tsvector('simple', coalesce(dist.name,'')), 'D'),
                     plainto_tsquery('simple', $1)
                   )
                 END DESC
      ) FILTER (WHERE prov.id IS NOT NULL) AS locations,
      (
        setweight(to_tsvector('simple', coalesce(s.name, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(s.description, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(c.name, '')), 'B') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT prov.name, ' ')), 'C') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT reg.name, ' ')), 'C') ||
        setweight(to_tsvector('simple', string_agg(DISTINCT dist.name, ' ')), 'D')
      ) AS document,
      string_agg(DISTINCT CONCAT(prov.name, ',', reg.name, ',', dist.name), ',') AS location_text
  FROM services s
  JOIN business_profiles bp ON bp.id = s.profile_id
  JOIN categories c ON c.id = s.category_id
  LEFT JOIN business_contacts bc ON bc.profile_id = bp.id
  LEFT JOIN business_locations bl ON bl.profile_id = bp.id
  LEFT JOIN provinces prov ON prov.id = bl.province_id
  LEFT JOIN regencies reg ON reg.id = bl.regency_id
  LEFT JOIN districts dist ON dist.id = bl.district_id
  GROUP BY s.id, s.name, bp.business_name, bp.slug, s.slug, s.description, c.id, c.name, c.slug
), selected AS (
    SELECT 
       entity_id AS id,
       name,
       slug,
       category_name,
       category_slug,
       type,
       price,
       description,
       locations::jsonb,
       contacts::jsonb,
       profile_name,
       profile_slug,
       CASE
         WHEN $1 = '' OR $1 IS NULL THEN 0
         ELSE ts_rank(document, plainto_tsquery('simple', $1))
       END AS rank
FROM search
WHERE 1=1 
AND ($1 = '' OR $1 IS NULL OR document @@ plainto_tsquery('simple', $1)) 
AND ($2 = '' OR $2 IS NULL OR category_slug = $2)
AND ($3 = '' OR $3 IS NULL OR EXISTS (
            SELECT 1
            FROM jsonb_array_elements(locations::jsonb) loc
            WHERE (loc->>'province_slug' = $3 OR loc->>'regency_slug' = $3 OR loc->>'district_slug' = $3)
        ))

), 
paginate AS (
  SELECT * FROM selected ORDER BY rank DESC, name LIMIT 16 OFFSET ${Prisma.raw(
    String(q.get("page") ? (+q.get("page")! - 1) * 16 : 0)
  )}
),
total AS (SELECT count(*)::INT AS total FROM selected)

SELECT
    (SELECT total from total) AS total,       
    COALESCE(json_agg(
        jsonb_build_object(
            'id', s.id,
            'name', s.name,
            'slug',s.slug,
            'categoryName', s.category_name,
            'categorySlug', s.category_slug,
            'type', s.type,
            'price', s.price,
            'profileName', s.profile_name,
            'profileSlug', s.profile_slug,
            'contacts',s.contacts,
            'locations', (
              SELECT json_agg(
                jsonb_build_object(
                  'provinceSlug', loc->>'province_slug',
                  'provinceName', loc->>'province_name',
                  'regencySlug', loc->>'regency_slug',
                  'regencyName', loc->>'regency_name',
                  'districtSlug', loc->>'district_slug',
                  'districtName', loc->>'district_name'
                )
              ) FROM jsonb_array_elements(s.locations) AS loc WHERE ($3 = '' OR $3 IS NULL OR (loc->>'province_slug' = $3 OR loc->>'regency_slug' = $3 OR loc->>'district_slug' = $3))
            )
        )
    ), '[]') AS data 
FROM paginate s
`;

  return prisma.$queryRawUnsafe<[{ total: Number; data: SearchList[] }]>(
    sql.sql,
    q.get("q"),
    q.get("category"),
    q.get("location")
  );
};
