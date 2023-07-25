import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import axios from "axios";

export default async function sendChat(req: any, res: any) {
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
      debugLogging: true,
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
    const msg = {
      body: {
        content: "Hello world",
      },
    };

    // console.log(graphClient);

    const response = await graphClient.api("/chats").post(chat);
    console.log("aaa", response);
    const chatResponse = await graphClient
      .api(
        `/chats/19:46af2548-1d7a-4851-9467-1967911b4acd_ad8f25ec-0b16-478e-9e25-dfe283c413f5@unq.gbl.spaces/messages`
      )
      .post(msg);

    res.send({ response, chatResponse });
  } catch (error) {
    res.send({ error });
  }
}
