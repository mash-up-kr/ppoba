export const categories = ['all', 'system', 'aws'] as const;

export type Category = (typeof categories)[number];
