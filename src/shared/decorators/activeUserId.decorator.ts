import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException(
        'ActiveUserId decorator should be used in guarded routes',
      );
    }

    return userId;
  },
);
