import { OAuth2Client } from "google-auth-library";
import { clientId, clientSecret } from "./constants.js";
import { oAuthRedirectUri, oAuthScopeUrls } from "./urls.js";

export const oAuth2Client = new OAuth2Client(
  clientId,
  clientSecret,
  oAuthRedirectUri
);

export const authorizeUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: `${oAuthScopeUrls.join(" ")} openid`,
  prompt: "consent",
});
