import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="forest" data-a11y="enhanced" data-app-ready="false">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon-48.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var root = document.documentElement;
                root.dataset.theme = "forest";
                try {
                  root.dataset.a11y = window.localStorage.getItem("phase4-a11y") || "enhanced";
                } catch (error) {
                  root.dataset.a11y = "enhanced";
                }
              })();
            `
          }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="bb0139a2-9dca-457e-961f-7024babf4ef0"
        />
      </Head>
      <body>
        <div id="app-boot-loader" aria-hidden="true">
          <div className="app-boot-loader__dot" />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
