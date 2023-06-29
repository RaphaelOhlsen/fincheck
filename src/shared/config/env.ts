import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  validateSync,
} from 'class-validator';

class Env {
  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(32)
  @Matches(/[a-z]/, {
    message:
      'jwtSecret must contain at least: 3 lowercase characters, 3 uppercase characters, 3 numbers, 3 special characters. ',
  })
  @Matches(/[A-Z]/, {
    message:
      'jwtSecret must contain at least: 3 lowercase characters, 3 uppercase characters, 3 numbers, 3 special characters. ',
  })
  @Matches(/[0-9]/, {
    message:
      'jwtSecret must contain at least: 3 lowercase characters, 3 uppercase characters, 3 numbers, 3 special characters. ',
  })
  @Matches(/[!@#$%^&*()]/, {
    message:
      'jwtSecret must contain at least: 3 lowercase characters, 3 uppercase characters, 3 numbers, 3 special characters. ',
  })
  jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
  DATABASE_URL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
