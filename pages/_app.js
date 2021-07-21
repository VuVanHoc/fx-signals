import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const accessKey = localStorage.getItem("accessKey");
    if (!accessKey) {
      router.push("/login");
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
