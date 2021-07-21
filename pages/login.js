import Head from "next/head";
import LoginContainer from "../components/Login";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div>
      <Head>
        <title>Forex Signal</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <LoginContainer />
      <Footer />
    </div>
  );
}
