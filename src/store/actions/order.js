import * as actionTypes from './actionTypes';
import axios from 'axios'


///Synchronous action
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

////Asynchronous action
export const purchaseBurgerStart = () => {
  return{
      type: actionTypes.PURCHASE_BURGER_START
  }
}


export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('https://react-burger-bf04f.firebaseio.com/orders.json', orderData)
            .then(respose => {
                console.log(respose.data)
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

export const fetchOders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get("https://react-burger-bf04f.firebaseio.com/orders.json")
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