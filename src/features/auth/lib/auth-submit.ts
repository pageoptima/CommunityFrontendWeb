type AuthRouter = {
  replace: (url: string) => void;
  refresh: () => void;
};

type AuthSubmitOptions = Readonly<{
  endpoint: "/api/auth/login" | "/api/auth/register";
  payload: Record<string, unknown>;
  redirectTo: string;
  router: AuthRouter;
  onError: (message: string) => void;
  fallbackMessage: string;
}>;

export async function submitAuthRequest({
  endpoint,
  payload,
  redirectTo,
  router,
  onError,
  fallbackMessage,
}: AuthSubmitOptions) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (!response.ok) {
      onError(data?.message ?? fallbackMessage);
      return false;
    }

    router.replace(redirectTo);
    router.refresh();
    return true;
  } catch {
    onError(fallbackMessage);
    return false;
  }
}
