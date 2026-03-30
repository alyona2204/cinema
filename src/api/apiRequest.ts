const BASE_URL = "https://shfe-diplom.neto-server.ru";

export type ApiResponseType<T> = {
  success: boolean;
  result?: T;
  error?: string;
};

type ApiConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: FormData;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  endpoint: string,
  config: ApiConfig = {},
): Promise<ApiResponseType<T>> {
  const { method = "GET", body, headers } = config;

  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    body,
    headers,
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Api request failed: ${response.statusText}`);
  }

  return await response.json();
}

export default apiRequest;
