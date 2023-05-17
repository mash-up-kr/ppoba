import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { readFile } from 'fs/promises';

// Commmand: terraform state show aws_lambda_function.function
// to retrieve lambda metadata
describe('invoke lambda', () => {
  it('successfully invoke lambda', async () => {
    const payloadFileName = './payload.auth.json';
    const payload = await readFile(require.resolve(payloadFileName), 'utf8');

    const client = new LambdaClient({ region: 'ap-northeast-2' });
    const response = await client.send(
      new InvokeCommand({
        FunctionName: 'auth',
        Payload: jsonToPayload(payload),
      })
    );
    console.log(parseResponse(response.Payload));
  });
});

function parseResponse(payload?: Uint8Array): Record<string, any> {
  if (payload == null) {
    return {};
  }
  return JSON.parse(Buffer.from(payload).toString('utf-8'));
}

function jsonToPayload(data: Record<string, any> | string): Uint8Array {
  if (typeof data === 'string') {
    Buffer.from(data);
  }
  return Buffer.from(JSON.stringify(data));
}
