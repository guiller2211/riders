export type UserData = {
  firstName?: string;
  language?: string;
  lastName?: string;
  name?: string;
  title?: string;
  titleCode?: string;
  code?: string;
  email?: string;
  userType?: string;
  division?: string;
  status?: UserStatus;
};

export type UserStatus = {
  statusCode: number;
  statusName: string;
};
