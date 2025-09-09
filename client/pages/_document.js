import { Html, Head, Main, NextScript } from "next/document"; // ye document.js server side render per use hota hai 

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
