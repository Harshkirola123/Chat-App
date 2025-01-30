import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    user: User!
    token: String!
    refreshToken: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
    ): AuthPayload!
  }
`;

export default userTypeDefs;

// loginUser(email: String!, password: String!): AuthPayload!
