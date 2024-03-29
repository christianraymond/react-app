import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isRegister) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBii07dew2AaWyAsh4cAnA47u8cBpNpUGc';
        if (!isRegister) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBii07dew2AaWyAsh4cAnA47u8cBpNpUGc';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn))
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.error);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    //The request was made and the server respondied with a status code that fail out of the range 2xx
                    dispatch(authFail(error.response.data.error));
                } else if (error.request) {
                    //The request was made but no response was received
                    return error.request
                } else {
                    console.log('Error', error.message);
                    return error.message
                }
            })
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}