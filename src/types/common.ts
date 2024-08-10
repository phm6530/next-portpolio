export type InferObj<T> = T extends { type: infer U } ? U : never;
export type InferArr<T> = T extends (infer U)[] ? U : never;
export type inferFunc<T> = T extends (...arg: any[]) => infer R ? R : never;
