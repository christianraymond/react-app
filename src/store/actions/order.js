import * as actionTypes from './actionTypes';
import axios from 'axios'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}
export const purchaseBurgerStart = () => {
  return{
      type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('https://react-burger-bf04f.firebaseio.com/orders.json?auth=' + token, orderData)
            .then(respose => {
                dispatch(purchaseBurgerSuccess(respose.data.name, orderData))
            })
            .catch(error => {
            dispatch(purchaseBurgerFail(error));
        })
    }
}
export const onInitPurchase = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
};
export const fetchOderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}
export const fetchOderFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("https://react-burger-bf04f.firebaseio.com/orders.json" + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                }
                )
            }
            dispatch(fetchOderSuccess(fetchedOrders))
        })
        .catch(error => {
           dispatch(fetchOderFailed(error))
        })
    }
}