type ApiMessageResponse = {
  message?: string;
};

type RequestJsonOptions<TBody> = Omit<RequestInit, "body"> & {
  body?: TBody;
  fallbackMessage: string;
};

export async function requestJson<TResponse, TBody = undefined>(
  input: RequestInfo | URL,
  { body, fallbackMessage, headers, ...init }: RequestJsonOptions<TBody>,
) {
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(input, {
      ...init,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: requestHeaders,
    });

    const data = (await response.json().catch(() => null)) as
      | (TResponse & ApiMessageResponse)
      | null;

    if (!response.ok) {
      throw new Error(data?.message ?? fallbackMessage);
    }

    return (data ?? {}) as TResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(fallbackMessage);
  }
}
