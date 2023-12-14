export const cookieDays = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
export const clientId = process.env.GOOGLE_CLIENT_ID;
export const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

export const cookieOptions = { secure: true, expires: cookieDays };
export const modelOptions = { timestamps: true, versionKey: false };

export const passwordEmptyError =
  "Please sign in with Google and set a password through the settings.";
