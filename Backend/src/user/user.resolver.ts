import { createUser, loginUser } from "../user/user.service";

const userResolvers = {
  Mutation: {
    createUser: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      try {
        const result = await createUser(username, email, password);
        if (result.status !== 200) {
          throw new Error(result.message);
        }
        return result.data; // Return user and tokens (accessToken, refreshToken)
      } catch (error) {
        throw new Error("Error");
      }
    },
  },
};

export default userResolvers;
