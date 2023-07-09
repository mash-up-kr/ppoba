import { Injectable } from '@nestjs/common';

@Injectable()
export class DeckRepository {
  async create() {
    return 'This action adds a new deck';
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
