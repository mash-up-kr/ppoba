import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env, stage } from '../env';
import { UserCollection, UserDocument } from './User';
import { Card, CardCollection, CardDocument } from './Card';
import { CollectionToModel, collectionToModules } from './utils';
import { Deck, DeckCollection } from './Deck';

type Model = CollectionToModel<typeof collections>;

// 여기에 추가
const collections = {
  User: UserCollection,
  Card: CardCollection,
  Deck: DeckCollection,
};

const { CollectionModule, InjectModel } = collectionToModules(collections);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(env.database.connectionURI, { dbName: stage }),
    CollectionModule,
  ],
  exports: [CollectionModule],
})
class DatabaseModule {}

export {
  DatabaseModule,
  InjectModel,
  Model,
  UserDocument,
  Card,
  CardDocument,
  Deck,
  DeckCollection,
};
