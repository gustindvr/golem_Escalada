export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type Error = {
  status: number;
  message: string;
}