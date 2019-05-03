import {GetTokenList} from "../helpers/CRUDActionReducer";

export function tokenFetch(token){
  return GetTokenList(token,'/auth/token/list','TOKEN')
}
