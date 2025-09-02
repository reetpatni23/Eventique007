"use client";

import { useRouter } from "next/navigation";
import appwrite from "@/constants/appwrite_config"; // ✅ use your AppwriteConfig instance

export default function Login() {
  const router = useRouter();

  async function handleLogin() {
    try {
      // ✅ Use the googleLogin method from your AppwriteConfig
      await appwrite.googlelog();
    } catch (error) {
      console.error("Login error:", error);
      router.push("/login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Login to Evently</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
