import { loginUser } from "../user/user.service";

export const authResolvers = {
  Mutation: {
    loginUser: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const result = await loginUser(email, password);
        if (result.status !== 200) {
          throw new Error(result.message);
        }
        return result.data;
      } catch (error) {
        throw new Error("Error");
      }
    },
  },
};
