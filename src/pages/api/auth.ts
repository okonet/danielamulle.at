import { NowRequest, NowResponse } from "@now/node"
import crypto from "crypto"
import { AuthorizationCode } from "simple-oauth2"

export const config = {
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: `https://github.com`,
    tokenPath: `/login/oauth/access_token`,
    authorizePath: `/login/oauth/authorize`,
  },
}

export const randomString = () => crypto.randomBytes(4).toString(`hex`)

export default (req: NowRequest, res: NowResponse) => {
  const { host } = req.headers

  const client = new AuthorizationCode(config)
  const authorizationUri = client.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  })

  res.redirect(authorizationUri)
}
