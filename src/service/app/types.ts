/* 状态枚举 */
export enum StatusEnum {
  pending = 'pending',      // 等待
  fulfilled = 'fulfilled',  // 成功
  rejected = 'rejected',    // 拒绝
}

/* 状态枚举类型 */
export type IStatusEnum = keyof typeof StatusEnum

