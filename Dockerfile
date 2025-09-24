# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG SKIP_DB=false
ENV SKIP_DB=$SKIP_DB

ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_NAME=$DB_NAME

ARG DB_HOST
ARG DB_PORT
ARG DB_SCHEMA
ARG DATABASE_URL
ARG BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_IMAGE_PATH
ARG NEXT_PUBLIC_WA_LINK
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG SESSION_SECRET

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_SCHEMA=$DB_SCHEMA
ENV DATABASE_URL=$DATABASE_URL
ENV BASE_URL=$BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_IMAGE_PATH=$NEXT_PUBLIC_IMAGE_PATH
ENV NEXT_PUBLIC_WA_LINK=$NEXT_PUBLIC_WA_LINK
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV SESSION_SECRET=$SESSION_SECRET

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Jalankan prisma generate sebelum build Next.js
# RUN npx prisma generate

RUN if [ "$SKIP_DB" = "true" ]; then \
        echo "Skipping prisma generate"; \
    else \
        npx prisma generate; \
    fi

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build Next.js
RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy Prisma schema & generated client (optional untuk runtime migrations)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 4000
ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
