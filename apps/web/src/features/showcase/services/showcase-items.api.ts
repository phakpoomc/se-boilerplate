import type {
  ApiResponse,
  CreateShowcaseItemInput,
  ShowcaseItem,
  UpdateShowcaseItemInput
} from "@starter/shared";
import { apiUrl } from "./api-url";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new ApiError(
      response.ok
        ? "The API returned an unexpected response."
        : "The showcase API is not available at the configured address. Check the API terminal and port settings.",
      response.status
    );
  }

  const result = await response.json() as ApiResponse<T>;

  if (!response.ok || result.status === "error") {
    throw new ApiError(result.message, response.status, "errors" in result ? result.errors : undefined);
  }

  return result.data;
}

export const showcaseItemsApi = {
  list: () => apiRequest<ShowcaseItem[]>("/api/showcase-items"),

  create: (input: CreateShowcaseItemInput) =>
    apiRequest<ShowcaseItem>("/api/showcase-items", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input)
    }),

  update: (id: string, input: UpdateShowcaseItemInput) =>
    apiRequest<ShowcaseItem>(`/api/showcase-items/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input)
    }),

  delete: (id: string) =>
    apiRequest<null>(`/api/showcase-items/${id}`, { method: "DELETE" }),

  uploadAttachment: (id: string, file: File) => {
    const body = new FormData();
    body.append("attachment", file);
    return apiRequest<ShowcaseItem>(`/api/showcase-items/${id}/attachment`, {
      method: "POST",
      body
    });
  },

  removeAttachment: (id: string) =>
    apiRequest<ShowcaseItem>(`/api/showcase-items/${id}/attachment`, { method: "DELETE" })
};
