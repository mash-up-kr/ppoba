import { SetMetadata } from '@nestjs/common';

/**
 * Authoriation: Bearer ... 헤더가 필요없는 퍼블릭 라우트입니다.
 * Api client public에 해당합니다.
 */
export const Public = SetMetadata('public', true);
