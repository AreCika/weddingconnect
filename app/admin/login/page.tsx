import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="mx-auto mt-24 max-w-sm px-6">
      <h1 className="mb-6 text-center text-xl font-semibold">Admin Login</h1>
      <LoginForm />
    </div>
  );
}
