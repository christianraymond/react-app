import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleOrder from '../Orders/SingleOrder';
import axios from 'axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }
    render() {
        let orderOrSpinner = <Spinner />;
        if (!this.props.loading) {
            orderOrSpinner =
                this.props.orders.map(order => (
                    <SingleOrder
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                        cutomer={order.orderData}
                    />
                ))
        }
        return (
            <div>
                {orderOrSpinner}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token, ////Making signed user token availabe to order
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(actions.fetchOders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));