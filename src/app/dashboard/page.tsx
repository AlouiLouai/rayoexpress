import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logoutAction } from "./actions";

export default async function DashboardPage() {
  // Proxy already redirected unauthenticated requests away from this route
  // (optimistic check). Re-checking here is the authoritative check —
  // Server Components/Actions must never trust Proxy alone.
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Protected route</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium">{session.userId}</span>
            </p>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="w-full">
                Sign out
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
