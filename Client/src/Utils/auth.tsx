import { redirect } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function requireAuth(args?: LoaderFunctionArgs) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    if (args?.request) {
      const url = new URL(args.request.url);
      const redirectTo = url.pathname + url.search;
      throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    }
    throw redirect("/login");
  }

  return null;
}

export const withAuth =
  (loader?: (args: LoaderFunctionArgs) => any) =>
  async (args: LoaderFunctionArgs) => {
    await requireAuth(args);
    if (!loader) return null;
    return loader(args);
  };
