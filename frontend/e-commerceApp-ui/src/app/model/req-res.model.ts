
export interface ReqRes {
  ourUsers: ourUsers;
  error: string;
  message: string;
  token: string;
  refreshToken: string;
  expirationTime: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ourUsers{
  id: string
  role: string
}


