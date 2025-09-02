"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import appwrite from "@/constants/appwrite_config";

export default function LoginSuccessClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await appwrite.getCurUser();
        if (!currentUser) {
          router.push("/login"); // if no session → back to login
        } else {
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🎉 Login Successful!
      </h1>
      <p className="text-lg text-gray-800">Welcome, {user.name}</p>
      <p className="text-gray-600">{user.email}</p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
