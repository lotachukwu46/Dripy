import api from "@/app/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) redirect("/landing");

  try {
    const { data } = await api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userRole: "user" | "admin" = data.role;
    redirect(userRole === "admin" ? "/admin" : "/dashboard");
  } catch {
    redirect("/landing");
  }
}
