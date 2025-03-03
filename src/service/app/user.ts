import { http } from '@/utils/http';

/* 登录请求参数类 */
export type LoginParams = {
  username: string;
  password: string;
  agreed: boolean;
};

/* 用户信息 */
export type UserInfo = {
  userId: string;
  username: string; 
  realname: string;
  avatar: string;
  phone: string;
  email: string;
};

/* 登录信息 */
export type LoginData = {
  token: string;
  userInfo: UserInfo
}; 


/* 权限数据 */
type PermissionResult = {
  // 所有权限列表
  codeList: string[];
  // 菜单权限列表
  menu: any[];
}

/* 获取用户权限 */
export const fetchPermission = () => {
  return http.get<PermissionResult>('/system/userPermission');
}
