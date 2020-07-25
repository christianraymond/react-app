import React, { Component } from 'react';
import SingleOrder from '../Orders/SingleOrder';
import axios from 'axios';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
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
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <SingleOrder
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);