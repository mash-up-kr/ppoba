import * as dynamoose from 'dynamoose';
import { Item as _Item } from 'dynamoose/dist/Item';
import { stageValue } from '../../core/env';

export namespace IdGenerator {
  export class Item extends _Item {
    domain: string;
    cursor: number;
  }

  export const Schema = new dynamoose.Schema({
    domain: {
      type: String,
      hashKey: true,
    },
    cursor: {
      type: Number,
      required: true,
    },
  });

  export const Model = dynamoose.model<Item>(stageValue('IdGenerator'), Schema);
}
