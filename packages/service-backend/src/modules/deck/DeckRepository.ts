import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "../../core/database";
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import {DeckDocument} from "../../core/database/Deck";

@Injectable()
export class DeckRepository {
  constructor(@InjectModel.Deck private readonly deckModel: SoftDeleteModel<DeckDocument>) {
  }

  async create(name: string, userId:string): Promise<string> {
  try{
      const deck = await this.deckModel.create({
        name,
        userId,
    })
    return deck.id;
  }catch(error){
    throw new InternalServerErrorException(`error: ${error}`);
  }
  }

  async findOne(id: string) {
    return `This action returns a #${id} deck`;
  }

  async update(id: string) {
    return `This action updates a #${id} deck`;
  }

  async remove(id: string) {
    return `This action removes a #${id} deck`;
  }
}
