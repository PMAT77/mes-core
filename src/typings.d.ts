// 全局要用的类型放到这里

declare global {
  /* 辅助类型: 批量处理可选参数 */
  export type RecordNullable<T> = {
    [key: string]: T[keyof T] | null;
  };

  /* 分页列表类型 */
  type RecordsResult<T> = {
    current: number;
    records: T[];
    page: number;
    size: number;
    total: number;
  };

  /* 分页列表查询参数类型 */
  type RecordsParams<T> = {
    pageNo?: number;
    pageSize?: number;
  } & RecordNullable<T>;

  /* 分页列表响应 */
  type ApiRecordData<T> = {
    code?: number;
    message?: string;
    result?: RecordsResult<T>;
    sucess?: boolean;
    timestamp?: number;
  };

  /* 普通响应 */
  type ApiData<T> = {
    code?: number;
    message?: string;
    result?: T;
    sucess?: boolean;
    timestamp?: number;
  };

  /* uni.uploadFile 文件上传参数 */
  type IUniUploadFileOptions = {
    file?: File;
    files?: UniApp.UploadFileOptionFiles[];
    filePath?: string;
    name?: string;
    formData?: any;
  };

  type IUserInfo = {
    realname?: string;
    username?: string;
    avatar?: string;
    workNo?: string;
    /** 微信的 openid，非微信没有这个字段 */
    openid?: string;
    token?: string;
  };
}

export {}; // 防止模块污染
