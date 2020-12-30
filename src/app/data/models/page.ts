export interface Page<T = any> {
  results: Array<T>;
  count: number;
  previous: string;
  next: string;
}
