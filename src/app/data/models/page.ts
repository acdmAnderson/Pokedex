export interface PageModel<T = any> {
  results: Array<T>;
  count: number;
  previous: string;
  next: string;
}
