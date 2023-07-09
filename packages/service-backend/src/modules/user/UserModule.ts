import { Module } from '@nestjs/common';
import { UserRepository } from './UserRepository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
