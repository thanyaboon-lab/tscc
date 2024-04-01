import { Database } from '@tscc/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserModel } from './user.model';

const db = new Database<UserModel>('users', {
  defaultData: [
    {
      id: crypto.randomUUID(),
      email: 'user@example',
      name: 'bambino',
      password: 'password',
    },
  ],
});

const userRepository = new UserRepository(db);
export const userController = new UserController(userRepository);
