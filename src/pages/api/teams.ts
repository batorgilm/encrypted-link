import axios from "axios";

export default async function teams(req: any, res: any) {
  try {
    const { authorization } = req.headers;
    const { sendTo, message } = req.body;

    const { data } = await axios.post(
      "https://graph.microsoft.com/v1.0/chats",
      {
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
            "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${sendTo}')`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      }
    );

    const chat = await axios.post(
      `https://graph.microsoft.com/v1.0/chats/${data.id}/messages`,
      {
        body: {
          content: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.send({ chat });
  } catch (error) {
    return res.send({ error });
  }
}
