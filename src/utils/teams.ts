import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
export const sendChat = async () => {
  const CLIENT_ID = "404659cf-07ec-4947-bd24-58afa86de474";
  const CLIENT_SECRET = "5Ws8Q~nh4MsFub4gRVYxQf0_IMPIHwdEMNLR6cos";
  const TENANT_ID = "aae8fbe2-488b-49d9-b471-e4be61674a71";

  try {
    const credential = new ClientSecretCredential(
      TENANT_ID,
      CLIENT_ID,
      CLIENT_SECRET
    );

    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ["https://graph.microsoft.com/.default"],
    });

    const graphClient = Client.initWithMiddleware({
      authProvider,
    });

    const chat = {
      chatType: "oneOnOne",
      members: [
        {
          "@odata.type": "#microsoft.graph.aadUserConversationMember",
          roles: ["owner"],
          "user@odata.bind":
            "https://graph.microsoft.com/v1.0/users('batorgil.m@nest.edu.mn')",
        },
        {
          "@odata.type": "#microsoft.graph.aadUserConversationMember",
          roles: ["owner"],
          "user@odata.bind":
            "https://graph.microsoft.com/v1.0/users('turbold.ch@nest.edu.mn')",
        },
      ],
    };

    const res = await graphClient.api("/chats").post(chat);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
