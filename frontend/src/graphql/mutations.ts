import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($userId: String!, $content: String!) {
    sendMessage(userId: $userId, content: $content) {
      id
      content
      createdAt
    }
  }
`;

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name) {
      id
      name
    }
  }
`;
