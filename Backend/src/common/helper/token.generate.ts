import jwt from "jsonwebtoken";
// import IUser from "../../User/user.dto";

/**
 * Generates a refresh token for the user.
 *
 * @param {String} id - User's ID.
 * @param {String} name - User's name.
 * @param {String} email - User's email address.
 *
 * @returns {String} A JSON Web Token that can be used to authenticate the user for a longer period (1 year).
 *
 * @example
 * const refreshToken = refreshTokenGenerate("123456789", "John Doe", "john.doe@example.com");
 * console.log(refreshToken);
 */
export const refreshTokenGenerate = (
  id: String,
  name: String,
  email: String
) => {
  const refreshToken = jwt.sign(
    { id: id, email: email },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1y" }
  );
  return refreshToken;
};

/**
 * Generates an access token for the user.
 *
 * @param {String} id - User's ID.
 * @param {String} name - User's name.
 * @param {String} email - User's email address.
 *
 * @returns {String} A JSON Web Token that can be used to authenticate the user for a short period (10 minutes).
 *
 * @example
 * const accessToken = accessTokenGenerate("123456789", "John Doe", "john.doe@example.com");
 * console.log(accessToken);
 */

export const accessTokenGenerate = (
  id: String,
  name: String,
  email: String
) => {
  const accessToken = jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "10m" }
  );
  // console.log("Hello " + accessToken);
  return accessToken;
};
