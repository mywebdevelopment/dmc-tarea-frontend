export interface UserDto {
    userId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    address: string;
    phoneNumber: string;
    role: string;
    status: string;
  }
  
  export interface UserLoginRequest {
    username: string;
    password: string;
  }