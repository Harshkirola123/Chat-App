import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";
import prisma from "../config/prisma.config";

const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
const pubsub = new PubSub<any>();

export const resolvers = {
  Query: {
    messages: async (
      _: any,
      { senderId, recipientId }: { senderId: string; recipientId: string }
    ) => {
      return await prisma.message.findMany({
        where: {
          senderId,
          recipientId,
        },
      });
    },
  },
  Mutation: {
    sendMessage: async (
      _: any,
      {
        senderId,
        recipientId,
        content,
        mediaUrl,
      }: {
        senderId: string;
        recipientId: string;
        content: string;
        mediaUrl?: string;
      }
    ) => {
      const message = await prisma.message.create({
        data: {
          senderId,
          recipientId,
          content,
          mediaUrl,
        },
      });

      pubsub.publish(MESSAGE_RECEIVED, {
        messageReceived: message,
        recipientId,
      });
      return message;
    },
  },
  Subscription: {
    messageReceived: {
      subscribe: (_: any, { recipientId }: { recipientId: string }) => {
        return pubsub.asyncIterableIterator(MESSAGE_RECEIVED);
      },
    },
  },
};
