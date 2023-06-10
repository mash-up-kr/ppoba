import { Module } from '@nestjs/common';
import { UserRepository } from './UserRepository';
import { IdGeneratorModule } from '../id-generator/IdGeneratorModule';

@Module({
  imports: [IdGeneratorModule],
  providers: [UserRepository],
})
export class UserModule {}
