import {GetActivityList} from "../helpers/CRUDActionReducer";

export function activityFetch(token, id){
  return GetActivityList(token,`/auth/activity/list/${id}`,'ACTIVITY')
}
