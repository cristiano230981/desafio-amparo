import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { configService } from '../config/config.service';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // se a rota for protegida, tem um usuário no auth.middleware
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }

    // mesmo que a rota não seja protegida, iremos identificar o usuário pelo token
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    if (token && token[1]) {
        const decoded: any = jwt.verify(token[1], configService.SECRET());
        return !!data ? decoded[data] : decoded.user;
    }
});