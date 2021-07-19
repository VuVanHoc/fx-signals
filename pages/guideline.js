import Head from "next/head";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
export default function guideline() {
  return (
    <div>
      <Head>
        <title>FX-Crypto Signal - Guideline</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
