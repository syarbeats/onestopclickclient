import {GetHttpTraceList} from "../helpers/CRUDActionReducer";

export function httpTraceFetch(token){
  return GetHttpTraceList(token,'/actuator/httptrace','HTTPTRACE')
}
