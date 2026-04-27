"use client";

import Script from "next/script";

/**
 * Google Analytics 4 setup
 *
 * To get your GA4 Measurement ID:
 * 1. Go to https://analytics.google.com/
 * 2. Sign in with your Google account
 * 3. Click "Admin" → "Create Property"
 * 4. Fill in property name: "WiredWorld" and select Web
 * 5. Add your website URL: https://wiredworldgh.com
 * 6. Click "Create"
 * 7. Under "Data streams", click the web stream
 * 8. Copy the "Measurement ID" (format: G-XXXXXXXXXX)
 * 9. Add it to your .env.local file:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Once added, GA4 will start tracking immediately.
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
