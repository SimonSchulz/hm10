import bcrypt from "bcrypt";
import { injectable } from "inversify";

@injectable()
export class BcryptService {
  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
