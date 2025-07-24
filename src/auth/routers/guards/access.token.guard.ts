import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { AuthorizationError } from "../../../core/utils/app-response-errors";
import TYPES from "../../../core/container/types";
import { JwtService } from "../../domain/jwt.service";
import { UsersRepository } from "../../../user/repositories/user.repository";

@injectable()
export class AccessTokenGuard {
  constructor(
    @inject(TYPES.JwtService) private readonly jwtService: JwtService,
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new AuthorizationError();

      const [authType, token] = authHeader.split(" ");
      if (authType !== "Bearer" || !token) throw new AuthorizationError();

      const payload = await this.jwtService.verifyAccessToken(token);
      if (!payload)
        throw new AuthorizationError("Access token expired or invalid");

      const user = await this.usersRepository.findById(payload.userId);
      if (!user) throw new AuthorizationError();

      req.userInfo = {
        userId: user._id.toString(),
        userLogin: user.login,
      };

      next();
    } catch (error) {
      next(error);
    }
  }
}
