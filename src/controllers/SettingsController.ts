import { Request, Response } from "express";
import SettingsService from "../services/SettingsService";

class SettingsController {

  async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingsService = new SettingsService();

    try {
      const setting = await settingsService.create({
        username,
        chat,
      });

      return response.status(201).json(setting);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    const settings = await settingsService.update({ id, chat });

    return response.json(settings);
  }

  async findByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUserName(username);

    return response.json(settings);
  }
}

export default SettingsController;