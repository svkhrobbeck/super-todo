import { frontUri } from "../helpers/urls.js";
import getUserData from "../helpers/getUserData.js";
import { authorizeUrl, oAuth2Client } from "../helpers/oAuth.js";
import { cookieOptions } from "../helpers/constants.js";
import { generateJwt } from "../helpers/token.js";
import User from "../models/user.js";

export const authGetUrlRequest = (req, res) => {
  res.status(200).json({ url: authorizeUrl });
};

export const authSignWithGoogle = async (req, res) => {
  const code = req.query.code;
  let user = {};

  try {
    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);

    const userData = await getUserData(oAuth2Client.credentials.access_token);
    const isUserExist = await User.findOne({ email: userData.email }).lean();

    if (isUserExist) user = isUserExist;
    else user = await User.create(userData);

    const access_token = generateJwt({ userId: user._id, role: user.role });
    res.cookie("access_token", access_token, cookieOptions);

    res.status(200).redirect(frontUri);
  } catch (err) {
    console.log("google sign-in error", err);
  }
};
