export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}
  