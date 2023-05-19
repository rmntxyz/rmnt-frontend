import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="canonical" href="https://rmnt.xyz" />
          <meta property="og:title" content="Rarement" />
          <meta property="og:description" content="Own the rare moment" />
          <meta property="og:url" content="https://rmnt.xyz" />
          <meta property="og:image:url" content="https://storage.googleapis.com/rmnt/logo_b_aefe31ad11/logo_b_aefe31ad11.png?updated_at=2023-05-05T19:27:25.913Z" />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="304" />
          <meta property="og:image:alt" content="Rarement" />
          <meta property="og:image:type" content="image/png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@rmntxyz" />
          <meta name="twitter:title" content="Rarement" />
          <meta name="twitter:description" content="Own the rare moment" />
          <meta name="twitter:image" content="https://storage.googleapis.com/rmnt/logo_b_aefe31ad11/logo_b_aefe31ad11.png?updated_at=2023-05-05T19:27:25.913Z" />
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
