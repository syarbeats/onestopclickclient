import {submitResetPasswordRequest} from "../helpers/CRUDActionReducer";

export function resetPassword(email){
  return submitResetPasswordRequest(email,'/api/v1/users/user/resetpassword','RESET')
}
