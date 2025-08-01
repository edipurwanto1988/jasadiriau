type HttpResponse<T> = {
  total?: number;
  data: T;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  children?: Category[];
};
