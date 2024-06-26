import { ConversationInterface } from "../../types/messengerInterface";
import { ConversationRepository } from "../../repositories/conversationRepository";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";

export const newConversation = async (
    data: ConversationInterface,
    dbRepositoryConversation: ReturnType<ConversationRepository>
) => {
    try {
        const conversation = await dbRepositoryConversation.newConversation(data);
        return conversation;
    } catch (error) {
        throw new Error('Failed to create conversation');
    }
}

export const getConversation = async (
    id: string,
    dbRepositoryConversation: ReturnType<ConversationRepository>
) => {
    try {
        const conversation = await dbRepositoryConversation.getConversation(id);
        if (!conversation) {
            throw new AppError("not found any conversations", HttpStatus.NOT_FOUND)
        }
        return conversation;
    } catch (error) {
        throw new Error('Failed to get conversation');
    }
}