import { gql } from "apollo-server-express";

const messageSchema = gql`
  type Message {
    id: ID!
    senderId: String!
    recipientId: String!
    content: String!
    mediaUrl: String
    createdAt: String
  }

  type Query {
    messages(senderId: String!, recipientId: String!): [Message]
  }

  type Mutation {
    sendMessage(
      senderId: String!
      recipientId: String!
      content: String!
      mediaUrl: String
    ): Message!
    deleteMessage(id: ID!): Boolean!
  }
  type Subscription {
    messageReceived(recipientId: String!): Message!
  }
`;

export default messageSchema;
