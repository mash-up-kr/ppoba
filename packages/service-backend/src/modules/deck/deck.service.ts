import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DeckService {
  create(createDeckDto: CreateDeckDto) {
    return 'This action adds a new deck';
  }

  findOne(id: string) {
    return `This action returns a #${id} deck`;
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} deck`;
  }

  remove(id: string) {
    return `This action removes a #${id} deck`;
  }
}
