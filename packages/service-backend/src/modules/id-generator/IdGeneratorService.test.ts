import { IdGeneratorService } from './IdGeneratorService';
import { IdGenerator } from './IdGeneratorEntity';

describe('IdGeneratorService', () => {
  const TEST_DOMAIN = 'Test';
  const service = new IdGeneratorService();

  afterAll(async () => {
    IdGenerator.Model.delete({ domain: TEST_DOMAIN });
  });

  it('도메인에 해당하는 아이디가 없으면 새로 만든다.', async () => {
    expect(await service.generate(TEST_DOMAIN)).toMatchInlineSnapshot(`
      {
        "cursor": 1,
        "domain": "Test",
      }
    `);
  });

  it('도메인에 해당하는 아이디가 있으면 커서가 1씩 증가한다.', async () => {
    expect(await service.generate(TEST_DOMAIN)).toMatchInlineSnapshot(`
      {
        "cursor": 2,
        "domain": "Test",
      }
    `);
    expect(await service.generate(TEST_DOMAIN)).toMatchInlineSnapshot(`
      {
        "cursor": 3,
        "domain": "Test",
      }
    `);
  });

  it('도메인을 잘못 입력하면 에러가 발생한다.', async () => {
    await expect(() =>
      service.generate('asdaqwpdoj' as any)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Error on typia.assert(): invalid type on $input.domain, expect to be ("Test" | "User")"`
    );
  });
});
