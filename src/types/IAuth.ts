export type ForgotPassword = {
  email: string;
};

export type ChangePasswordResponse = {
  code: string;
  data: string | null;
  errors: string | null;
  message: string;
  status: number;
  success: boolean;
};
