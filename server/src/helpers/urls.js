export const oAuthRedirectUri = process.env.OAUTH_REDIRECT_URI;
export const frontUri = process.env.FRONT_END_BASE_URL;
export const userinfoTokenUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

export const oAuthScopeUrls = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
