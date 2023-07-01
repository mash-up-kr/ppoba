import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '../env';
import { User, UserCollection, UserDocument } from './User';
import { CollectionToModel, collectionToModules } from './utils';

type Model = CollectionToModel<typeof collections>;

// 여기에 추가
const collections = {
  User: UserCollection,
};

const { CollectionModule, InjectModel } = collectionToModules(collections);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(env.database.connectionURI, { dbName: 'dev' }),
    CollectionModule,
  ],
  exports: [CollectionModule],
})
class DatabaseModule {}

export { DatabaseModule, InjectModel, Model, User, UserDocument };
