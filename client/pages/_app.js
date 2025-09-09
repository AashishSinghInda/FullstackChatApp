
import "@/styles/globals.css";
import instance from "@/utils/axiosInstance";
import { isTokenExpired } from "@/utils/checkTokenExpiry";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

   
      if (!accessToken || !refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
        return;
      }

     

 
      if (isTokenExpired(accessToken) && !isTokenExpired(refreshToken)) {
        try {
          const res = await instance.post("/auth/refresh-token", {
            refreshToken,
          });

          const newAccessToken = res.data.accessToken;
        
          localStorage.setItem("accessToken", newAccessToken);
        } catch (err) {
          console.log("Refresh token expired:", err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/login");
        }
      }

     
      if (isTokenExpired(refreshToken)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/login");
      }
    };

    checkTokens();
  }, [router]);  


  return(
 
  <Component {...pageProps} />
 
)}








































  /*   const router = useRouter()

   useEffect(()=>{
    const checkTokenExpiry = ()=>{
      const refreshToken = localStorage.getItem("refreshToken")
      const refreshTokenExpiry = localStorage.getItem("refreshTokenExpiry")
    //  const accessToken = localStorage.getItem("accessToken")  
    //  const accessTokenExpiry = localStorage.getItem("accessTokenExpiry") 


       if (!refreshToken || !refreshTokenExpiry) {
    //    localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpiry");
     //   localStorage.removeItem("accessTokenExpiry")
        if (router.pathname !== "/login") {
          router.push("/login");
        }
        return
      }  

        const now = Date.now();
      if (now >= Number(refreshTokenExpiry)) {
        console.log(" Refresh token expired. Logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpiry");
        router.push("/login");
      }
}
  
    
     checkTokenExpiry();
     router.events.on("routerChangeStart",checkTokenExpiry) // har router changes hone per bhi check karo 
    
     return()=>{
      router.events.off("routeChangeStart",checkTokenExpiry) // cleanup event listener
     }
      })       

     


  return <Component {...pageProps} />;
}  */
