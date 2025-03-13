
/* 用户信息 */
export type UserInfoData = {
  userId: string;
  username: string; 
  realname: string;
  avatar: string;
  phone: string;
  email: string;
};

/* 权限数据 */
export type PermissionData = {
  /** 权限列表 */
  codeList: string[]
  /** 权限菜单 */
  menu: any[]
}
