import { DynamicModule } from '@nestjs/common';
import { InjectModel as _InjectModel, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export function collectionToModules<T extends Record<string, any>>(
  collectionTable: T
): {
  InjectModel: {
    [K in keyof T]: ReturnType<typeof _InjectModel>;
  };
  CollectionModule: DynamicModule;
} {
  const InjectModel: any = {};

  for (const key in collectionTable) {
    InjectModel[key] = _InjectModel(collectionTable[key].name);
  }

  const CollectionModule = MongooseModule.forFeature(
    Object.values(collectionTable).map(collectionCtor => ({
      name: collectionCtor.name,
      schema: SchemaFactory.createForClass(collectionCtor).plugin(softDeletePlugin),
    }))
  );

  return {
    InjectModel,
    CollectionModule,
  };
}

export type CollectionToModel<T extends Record<string, any>> = {
  [K in keyof T]: Model<InstanceType<T[K]>>;
};
