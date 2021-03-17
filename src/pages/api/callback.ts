import { NowRequest, NowResponse } from "@now/node"
import { AuthorizationCode } from "simple-oauth2"
import { config } from "./auth"

type RenderBody = {
  (status: "success", content: { token: string; provider: "github" }): string
  (status: "error", content: Object): string
}

const renderBody: RenderBody = (status, content) => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  
  window.opener.postMessage("authorizing:github", "*");
</script>
`

export default async (req: NowRequest, res: NowResponse) => {
  const code = req.query.code as string
  const { host } = req.headers

  const client = new AuthorizationCode(config)

  try {
    const accessToken = await client.getToken({
      code,
      redirect_uri: `https://${host}/api/callback`,
      scope: `repo,user`,
    })
    const { token } = client.createToken(accessToken)

    res.status(200).send(
      renderBody("success", {
        token: token.access_token,
        provider: "github",
      })
    )
  } catch (error) {
    console.log("Access Token Error", error.message)
    res.status(200).send(renderBody("error", error))
  }
}
