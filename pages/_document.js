import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="canonical" href="https://www.rmnt.xyz" />
          <meta property="og:title" content="Rarement" />
          <meta property="og:description" content="Own the rare moment" />
          <meta property="og:url" content="https://nextjs.org/" />
          <meta
            property="og:image:url"
            content="https://storage.googleapis.com/rmnt/thumbnail_RMNT_SYMBOL_85224726cb/thumbnail_RMNT_SYMBOL_85224726cb.png"
          />
          <meta property="og:image:width" content="700" />
          <meta property="og:image:height" content="700" />
          <meta property="og:image:alt" content="Rarement" />
          <meta property="og:image:type" content="image/png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rmntxyz" />
          <meta name="twitter:title" content="Rarement" />
          <meta name="twitter:description" content="Own the rare moment" />
          <meta
            name="twitter:image"
            content="https://storage.googleapis.com/rmnt/thumbnail_RMNT_SYMBOL_85224726cb/thumbnail_RMNT_SYMBOL_85224726cb.png"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=block"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
