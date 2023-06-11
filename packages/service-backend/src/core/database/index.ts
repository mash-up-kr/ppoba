import { Global, Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory, InjectModel as _InjectModel } from '@nestjs/mongoose';
import { Model as _Model } from 'mongoose';
import { env } from '../env';
import { UserCollection, User, UserDocument } from './User';

type Model = {
  User: _Model<UserCollection>;
};

const InjectModel = {
  User: _InjectModel(UserCollection.name),
};

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(env.database.connectionURI, {
      dbName: 'dev',
    }),
    MongooseModule.forFeature([
      { name: UserCollection.name, schema: SchemaFactory.createForClass(UserCollection) },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: UserCollection.name, schema: SchemaFactory.createForClass(UserCollection) },
    ]),
  ],
})
class DatabaseModule {}

export { DatabaseModule, InjectModel, Model, User, UserDocument };
