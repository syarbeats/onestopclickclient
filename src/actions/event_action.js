import {GetEventList} from "../helpers/CRUDActionReducer";

export function eventFetch(token){
  return GetEventList(token,'/actuator/auditevents','EVENT')
}
