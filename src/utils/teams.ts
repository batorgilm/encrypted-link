import { ClientSecretCredential } from "@azure/identity";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";

export default async function sendChat() {
  const CLIENT_ID = "404659cf-07ec-4947-bd24-58afa86de474";
  const CLIENT_SECRET = "5Ws8Q~nh4MsFub4gRVYxQf0_IMPIHwdEMNLR6cos";
  const TENANT_ID = "aae8fbe2-488b-49d9-b471-e4be61674a71";

  try {
    // const msalConfig = {
    //   auth: {
    //     clientId: "92a3400f-2ea0-4e58-9322-1bd37c8e5c4e",
    //     authority:
    //       "https://login.microsoftonline.com/aae8fbe2-488b-49d9-b471-e4be61674a71",
    //     redirectUri: "http://localhost:3000/",
    //   },
    //   cache: {
    //     cacheLocation: "sessionStorage", // This configures where your cache will be stored
    //     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    //   },
    // };

    const pca = new PublicClientApplication({
      auth: {
        clientId: "92a3400f-2ea0-4e58-9322-1bd37c8e5c4e",
        authority: `https://login.microsoft.online/aae8fbe2-488b-49d9-b471-e4be61674a71`,
        redirectUri: "http://localhost:3000/",
      },
      cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    });

    // Authenticate to get the user's account
    const authResult = await pca.acquireTokenPopup({
      scopes: ["Chat.Create", "Chat.ReadWrite"],
    });

    if (!authResult.account) {
      throw new Error("Could not authenticate");
    }

    // @microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
      account: authResult.account,
      interactionType: InteractionType.Popup,
      scopes: ["Chat.Create", "Chat.ReadWrite"],
    });
    console.log(authProvider);
    // const graphClient = Client.initWithMiddleware({
    //   authProvider: authProvider,
    // });

    // const chat = {
    //   chatType: "oneOnOne",
    //   members: [
    //     {
    //       "@odata.type": "#microsoft.graph.aadUserConversationMember",
    //       roles: ["owner"],
    //       "user@odata.bind":
    //         "https://graph.microsoft.com/v1.0/users('turbold.ch@nest.edu.mn')",
    //     },
    //     {
    //       "@odata.type": "#microsoft.graph.aadUserConversationMember",
    //       roles: ["owner"],
    //       "user@odata.bind":
    //         "https://graph.microsoft.com/v1.0/users('batorgil.m@nest.edu.mn')",
    //     },
    //   ],
    // };
    // const chatResponse = await graphClient.api("/chats").post(chat);
    console.log(chatResponse);
    // res.send({ chatResponse });
  } catch (error) {
    console.log(error);
  }
}
