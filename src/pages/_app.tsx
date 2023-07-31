import "@/styles/globals.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const msalConfig = {
    auth: {
      clientId: "92a3400f-2ea0-4e58-9322-1bd37c8e5c4e",
      authority:
        "https://login.microsoftonline.com/aae8fbe2-488b-49d9-b471-e4be61674a71",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "secureCookies", // This configures where your cache will be stored
      storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  const msalInstance = new PublicClientApplication(msalConfig);
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />;
      </MsalProvider>
    </>
  );
}
