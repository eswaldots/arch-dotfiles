export interface GenericGetResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

export interface GenericPostResponse {
  success: boolean;
  error: string | null;
}

