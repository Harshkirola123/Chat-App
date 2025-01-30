import { gql } from "apollo-server-express";

const chatSchema = gql`
  type Chat {
    id: ID!
    participants: [User!]!
    messages: [Message!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    chats(userId: ID!): [Chat!]!
    chat(id: ID!): Chat
  }

  type Mutation {
    createChat(participants: [ID!]!): Chat!
    deleteChat(id: ID!): Boolean!
  }
`;

export default chatSchema;
