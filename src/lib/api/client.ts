import { HTTP_METHOD } from "@/constants/http-method";

interface ApiClientOptions<T = unknown> {
  url: string;
  method?: HTTP_METHOD;
  params?: Record<string, string | number>;
  data?: T;
  headers?: Record<string, string>;
}

export async function apiClient<T = unknown>({
  url,
  method = HTTP_METHOD.GET,
  params,
  data,
  headers = {},
}: ApiClientOptions<T>): Promise<Response> {
  const endpoint = new URL(url);
  const body = ["POST", "PUT", "PATCH"].includes(method)
    ? data instanceof FormData
      ? data
      : JSON.stringify(data)
    : undefined;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      endpoint.searchParams.append(key, String(value));
    });
  }
  const response = await fetch(endpoint.toString(), {
    method,
    headers: {
      ...headers,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
