import { assert } from 'typia';

export type Stage = 'dev' | 'prod';

export const stage = assert<Stage>(process.env.STAGE ?? 'dev');

export const stageValue = <T extends string>(value: T): string => {
  if (stage === 'prod') {
    return value;
  } else {
    return value + `-dev`;
  }
};

export const env = {
  kakao: {
    clientId: assert<string>(process.env.KAKAO_KEY),
    redirectURI: assert<string>(process.env.KAKAO_REDIRECT_URI),
  },
  aws: {
    region: assert<string>(process.env.AWS_REGION),
    hostZoen: assert<string>(process.env.AWS_HOST_ZONE),
  },
  database: {
    connectionURI: assert<string>(process.env.MONGODB_CONNECTION_URI),
  },
  s3: {
    private: assert<string>(process.env.S3_PRIVATE_BUCKET),
    public: assert<string>(process.env.S3_PUBLIC_BUCKET),
    cdn: assert<string>(process.env.S3_CDN_BUCKET),
  },
};
