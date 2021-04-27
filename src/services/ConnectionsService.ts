import { getCustomRepository, Repository } from "typeorm";

import Connection from "../entities/Connection";
import ConnectionsRepository from "../repositories/ConnectionsReposity";

interface ICreateConnection {
  id?: string;
  user_id: string;
  admin_id?: string;
  socket_id: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor () {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  
  async create({ id, user_id, admin_id, socket_id }: ICreateConnection): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      user_id,
      admin_id,
      socket_id,
    });

    return this.connectionsRepository.save(connection);
  }

  async updateAdminId(user_id: string, admin_id: string): Promise<Connection> {
    return this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', { user_id })
      .select()
      .execute();
  }

  async findByUserId(user_id: string): Promise<Connection> {
    return this.connectionsRepository.findOne({ user_id });
  }

  async findAllWithoutAdmin(): Promise<Connection[]> {
    return this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });
  }

  async findBySocketId(socket_id: string): Promise<Connection> {
    return this.connectionsRepository.findOne({ socket_id });
  }
}

export default ConnectionsService;