import { ApolloServer } from "@apollo/server";
import userTypeDefs from "../user/user.schema.graphql";
import userResolvers from "../user/user.resolver";
import messageSchema from "../message/message.schema";
import chatSchema from "../chat/chat.schema";
import authSchema from "../graphql/schema";
import { authResolvers } from "../graphql/authResolver";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, messageSchema, chatSchema, authSchema],
  resolvers: {
    Mutation: {
      ...userResolvers.Mutation,
      ...authResolvers.Mutation,
    },
  },
});

export default server;
