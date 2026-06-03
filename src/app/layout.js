// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "@/scss/main.scss";
// import "@/scss/res.scss";

// import { ToastContainer } from "react-toastify";
// import { GlobalProvider } from "@/context/GlobalContext";
// import Script from "next/script";
// import FaviconUpdater from "@/components/FaviconUpdater";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Breakout",
//   description: "Breakout",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       {/* Google Tag Manager Script */}
//       <Script
//         async
//         src="https://www.googletagmanager.com/gtag/js?id=G-6XBND8CS7Q"
//       />

//       <Script id="google-analytics">
//         {`
//           window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());
//   gtag('config', 'G-6XBND8CS7Q');
//         `}
//       </Script>
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         <GlobalProvider>
//         <FaviconUpdater />
//           <ToastContainer />
//           {children}
//         </GlobalProvider>
//       </body>
//     </html>
//   );
// }


import { Geist, Geist_Mono } from "next/font/google";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/scss/main.scss";
import "@/scss/res.scss";

import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import Script from "next/script";
import FaviconUpdater from "@/components/FaviconUpdater";
import WebVitals from "@/components/WebVitals";
import UTMTracker from "@/components/UTMTracker";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://breakout.in"),
  title: "Breakout",
  description: "Breakout",
  alternates: {
    canonical: "/",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ GTM Script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NJTFSXM3');
            `,
          }}
        />

        {/* ✅ Meta Pixel */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !(function(f,b,e,v,n,t,s){
              if(f.fbq) return; n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
              n.queue=[]; t=b.createElement(e); t.async=!0;
              t.src=v; s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2172238316844997');
            fbq('track', 'PageView');
          `}
        </Script>
      </head> 

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJTFSXM3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <GlobalProvider>
          <WebVitals/>
          <UTMTracker/>
          <FaviconUpdater />
          <ToastContainer />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}