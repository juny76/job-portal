import { ConversationInterface } from "../types/messengerInterface";
import { ConversationRepositoryMongoDB } from "../app/database/repositories/conversationRepositioryMongoDB";

export const conversationRepository = (
    repository: ReturnType<ConversationRepositoryMongoDB>
) => {
    const newConversation = async (conversation: ConversationInterface)=> {
        const newConversations = await repository.createConversation(conversation);
        return newConversations;
    }

    const getConversation = async (id: string) => {
        const conversation = await repository.getConversation(id);
        return conversation;
    }

    return {
        newConversation,
        getConversation,
    }
}

export type ConversationRepository = typeof conversationRepository;