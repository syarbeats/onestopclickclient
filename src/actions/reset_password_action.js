import {submitResetPasswordRequest, submitNewPasswordRequest} from "../helpers/CRUDActionReducer";

export function resetPassword(email){
  return submitResetPasswordRequest(email,'/api/v1/users/user/resetpassword','RESET')
}

export function submitNewPassword(token, username, password){
  return submitNewPasswordRequest(token, username, password,'/api/v1/users/reset','RESET')
}
