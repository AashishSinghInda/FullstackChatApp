"use client";

import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; 

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token); // has { userId, email, iat, exp }
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        router.push("/login");
        return;
      }

      if (!decoded.userId || !decoded.email) {
        localStorage.removeItem("accessToken");
        router.push("/login");
        return;
      }

      setUser({ id: decoded.userId, email: decoded.email });
    } catch (err) {
      localStorage.removeItem("accessToken");
      router.push("/login");
    }
  }, [router]);

  if (!user) return <div>Checking auth...</div>;

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>UserId: {user.id}</p>
      <button onClick={() => { localStorage.clear(); router.push("/login"); }}>Logout</button>
    </div>
  );
}