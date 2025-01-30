import prisma from "../config/prisma.config";

export const getAllMessage = async (chatId: string) => {
  try {
    // Fetch messages from the database based on the chatId
    const messages = await prisma.message
      .findMany({ chat: chatId })
      .populate("sender")
      .populate("chat");
    return messages;
  } catch (error) {
    throw new Error("Failed to fetch messages");
  }
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  try {
    const message = await prisma.message.create({
      data: {
        sender: senderId,
        content,
        chat: chatId,
      },
    });
    return message;
  } catch (error) {
    throw new Error("Failed to send message");
  }
};
