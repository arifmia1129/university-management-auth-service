export type Pagination = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type ResponseWithPagination<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
