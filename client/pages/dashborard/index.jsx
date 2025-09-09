
"use client";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Header from "@/common/Header";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUser = async () => {
    try {
      const res = await instance.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);

     
      if (error.response?.status === 401) {
        toast.error("localstorage expired! Please login again.");
        
       setTimeout(() => {  // ya per bhi update kiya hai 
          router.push("/login"); // ya per bhi update kiya hai 
        }, 2000); // ya per bhi update kiya hai 
      }    
    } finally {
      setLoading(false);
    }
  }

 
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    
    if (!accessToken || !refreshToken) {
      router.push("/login");
    } else {
      fetchUser();
    }
  }, [router]);

  return (
    <div>
      <ToastContainer />
      <Header/>
      {loading ? (
        <p>Loading user info...</p>
      ) : user ? (
        <h2>
          Welcome, {user.name} ({user.email})
        </h2>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Dashboard;












































































/* "use client";
import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get("/auth/profile");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      {user ? <h2>Welcome, {user.name} {user.email}</h2> : <p>Loading user info...</p>}
    </div>
  );
};

export default Dashboard;   */ 
 


















































/* "use client"

import { useEffect, useState } from "react";
import instance from "../../utils/axiosInstance";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }

       const res = await instance.post("/auth/profile")
       /* {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });   */

   /*     setUser(res.data.user);   
      } catch (error) {
        localStorage.removeItem("accessToken");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      {user ? (
        <h2>Welcome, {user.id} {user.name} {user.email}  </h2>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;  */






















































































































/*  "use client";

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
}   */  