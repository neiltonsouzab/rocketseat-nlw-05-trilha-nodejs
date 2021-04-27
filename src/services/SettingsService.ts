import { getCustomRepository, Repository } from "typeorm";
import Setting from "../entities/Setting";
import SettingsRepository from "../repositories/SettingsRepository";

interface ICreateSetting {
  username: string;
  chat: boolean;
}

interface IUpdateSetting {
  id: string;
  chat: boolean;
}

class SettingsService {

  private settingsRepository: Repository<Setting>;

  constructor () {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: ICreateSetting): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const setting = this.settingsRepository.create({
      username,
      chat,
    });

    return this.settingsRepository.save(setting);
  }

  async update({ id, chat }: IUpdateSetting): Promise<Setting> {
    const settings = await this.settingsRepository.findOne(id);

    settings.chat = chat;

    return this.settingsRepository.save(settings);
  }

  async findByUserName(username: string): Promise<Setting> {
    return this.settingsRepository.findOne({ username });
  }

}

export default SettingsService;