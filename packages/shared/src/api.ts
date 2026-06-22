export type ApiResponse<TData = unknown> =
  | { status: "success"; code: number; message: string; data: TData }
  | { status: "error"; code: number; message: string; errors?: unknown };

export function ok<TData>(message: string, data: TData, code = 200): ApiResponse<TData> {
  return { status: "success", code, message, data };
}

export function fail(message: string, code = 500, errors?: unknown): ApiResponse {
  return { status: "error", code, message, errors };
}
