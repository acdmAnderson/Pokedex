export interface Pagination<T = any> {
  results: Array<T>;
  count: number;
  previous: number;
  next: number;
}
