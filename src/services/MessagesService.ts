import { getCustomRepository, Repository } from "typeorm";

import Message from "../entities/Message";
import MessagesRepository from "../repositories/MessagesRepository";

interface ICreateMessage {
  text: string;
  user_id: string;
  admin_id?: string
}

class MessagesService {

  private messagesRepository: Repository<Message>;

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }
  
  async listByUser(user_id: string): Promise<Message[]> {
    const messages = await this.messagesRepository.find({
      where: {
        user_id,
      },
      relations: ['user'],
    });

    return messages;
  }

  async create({ text, user_id, admin_id }: ICreateMessage): Promise<Message> {
    const message = this.messagesRepository.create({
      text,
      user_id,
      admin_id,
    });

    return this.messagesRepository.save(message);
  }

}

export default MessagesService;