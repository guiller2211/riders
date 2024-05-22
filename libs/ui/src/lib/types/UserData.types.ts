export type UserData = {
  firstName?: string;
  language?: string;
  lastName?: string;
  name?: string;
  title?: string;
  titleCode?: string;
  code?: string;
  email?: string;
  phoneNumber?: string;
  userType?: string;
  division?: string;
  status?: UserStatus;
  lastModifiedAt?: string;
};

export type UserStatus = {
  statusCode: number;
  statusName: string;
};
