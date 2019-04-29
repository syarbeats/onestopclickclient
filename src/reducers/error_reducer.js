
export default function errorReducer(state={
    receiveResponse500:false
},action){
    if(action.type==="ERROR_RESPONSE_500_RECEIVE"){
        return {
            ...state,
            receiveResponse500:true
        }
    }else if(action.type==="ERROR_RESPONSE_500_OFF"){
        return {
            ...state,
            receiveResponse500:false
        }
    }
    return state
}

