export interface Pagination<T = any> {
  results: Array<T>;
  count: number;
  page: number;
  pageSize: number;
}
