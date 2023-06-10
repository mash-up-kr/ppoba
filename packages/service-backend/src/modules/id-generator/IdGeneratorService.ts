import { Injectable } from '@nestjs/common';
import { IdGenerator } from './IdGeneratorEntity';
import { Domain } from '../../core/domain';
import { assert } from 'typia';

@Injectable()
export class IdGeneratorService {
  async generate(domain: Domain): Promise<{ domain: Domain; cursor: number }> {
    if (await this.has(domain)) {
      return await this.increment(domain);
    } else {
      return await this.populate(domain);
    }
  }

  private async has(domain: Domain) {
    if (await IdGenerator.Model.get({ domain })) {
      return true;
    } else {
      return false;
    }
  }

  private async populate(domain: Domain) {
    const idItem = await IdGenerator.Model.create({
      domain,
      cursor: 1,
    });

    return this.toJSON(idItem);
  }

  private async increment(domain: Domain) {
    const updatedItem = await IdGenerator.Model.update(
      { domain },
      {
        $ADD: { cursor: 1 },
      } as any, // 요거 dyanmoose type이 안맞는듯
      { return: 'item' }
    );

    return this.toJSON(updatedItem);
  }

  private toJSON(item: { toJSON(): unknown }): { domain: Domain; cursor: number } {
    return assert<{ domain: Domain; cursor: number }>(item.toJSON());
  }
}
