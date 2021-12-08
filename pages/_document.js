/* eslint-disable @next/next/no-sync-scripts */
import { NextPage } from "next";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Struggling to decide what to eat? Use MunchHunt to hunt for the place that'll satisfy your cravings."
          />
          <meta
            name="title"
            property="og:title"
            content="MunchHunt"
          />
          <meta
            name="image"
            property="og:image"
            content=""
          />
          <link
            rel="icon"
            href=""
          />
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`}></script>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html >
    )
  };
}

export default MyDocument;
