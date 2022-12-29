import actionTypes from "../actionTypes";

const initialState={
    isLoggedIn:false,
    accessToken:null
}

function authReducer(state=initialState,action) {
  switch (action.type) {
    case actionTypes.LOGIN_FULFILLED:
        return {
    
          isLoggedIn:true,
          accessToken:action.payload
        };
    case actionTypes.LOGIN_REJECTED:
        return {
            isLoggedIn:false,
            accessToken:action.payload
        };
    case actionTypes.LOGOUT_FULFILLED:
        return {
       
            isLoggedIn:false,
            accessToken:null
        }
  
    default:
        return state;
  }
}

export default authReducer