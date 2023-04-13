import { UserEntity } from '@app/user/user.entitiy';
import { UserService } from '@app/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction } from 'express';

import { Request, Response } from 'express';

export interface CustomRequest extends Request {
  user: UserEntity;
}

Injectable();
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}

  async use(req: CustomRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const secret = this.config.get<string>('jwt_secret');

    try {
      const decode = this.userService.verifyToken(token, secret);
      const user = await this.userService.findById(decode.id);
      req.user = user;

      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
