import { frontUri } from "../helpers/urls.js";
import getUserData from "../helpers/getUserData.js";
import { authorizeUrl, oAuth2Client } from "../helpers/oAuth.js";
import { cookieOptions } from "../helpers/constants.js";
import { generateJwt } from "../helpers/token.js";
import User from "../models/user.js";

export const authGetUrlRequest = (req, res) => {
  res.status(200).json({ url: authorizeUrl });
};

