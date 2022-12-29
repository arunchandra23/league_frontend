import api from "../../api"
import actionTypes from "../actionTypes";

export const loginAction=(username,password)=>async (dispatch)=>{
    try{
        const response=await api.get(`login?username=${username}&userpass=${password}`)
        console.log(response.data.accessToken)
        dispatch({
            type: actionTypes.LOGIN_FULFILLED,
            payload: response.data.accessToken
        });
        return Promise.resolve()
    }
    catch(e){
        dispatch({
            type: actionTypes.LOGIN_REJECTED,
            payload: null
        });
    }

    // if(response.status===200){
        
    // }
    // else if(response.status===401){
        

    // }

};

export const logoutAction=()=>{
    return {
        type: 'LOGOUT_FULFILLED'
    }
}