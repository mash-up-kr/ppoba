import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { assert } from 'typia';
import { InjectModel, Card, CardDocument } from '../../core/database';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CardList } from './dto/createCardDto';

@Injectable()
export class CardRepository {
  constructor(
    @InjectModel.Card
    private readonly cardModel: SoftDeleteModel<CardDocument>
  ) {}

  async create(cardList: CardList[], deckId: string): Promise<boolean> {
    try {
      await Promise.all(
        cardList.map(async (card, index) => {
          try {
            await this.cardModel.create({ content: card.content, deckId: deckId });
          } catch (error) {
            throw new InternalServerErrorException(
              `error create card row ${index} \n reason is : error: ${error}`
            );
          }
        })
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(`error: ${error}`);
    }
  }

  async findById(id: string): Promise<Card | null> {
    const cardItem = await this.cardModel.findOne({ id });
    if (cardItem) {
      return assert<Card>(cardItem.toJSON());
    } else {
      return null;
    }
  }

  async delete(card: Card): Promise<object> {
    const deletedCard = await this.cardModel.softDelete({ id: card.id });
    return deletedCard;
  }

  async update(id: string, card: Card): Promise<object> {
    const updateCard = await this.cardModel.updateOne(
      { id: id },
      { $set: { content: card.content } }
    );

    return updateCard;
  }
  
  async findAll(deckId: string){
    const cards = await this.cardModel.find({ deckId }).exec();
    
    return cards;
  }
}
