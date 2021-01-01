
import * as jwt from 'jsonwebtoken';
import { configService } from '../config/config.service';

export class BaseController {

  constructor() {}

  protected getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, configService.SECRET());
    return decoded.id;
  }
}