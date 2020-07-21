import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from 'axios';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    sendOrderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Christian Ngubana',
                address: {
                    street: 'Testsreet 1',
                    zipCode: '49283',
                    country: 'Germany'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('https://react-burger-bf04f.firebaseio.com/orders.json', order)
            .then(respose => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="postalcode" placeholder="Your Postal Code" />
                <Button btnType='Success' clicked={this.sendOrderHandler}>SEND ORDER</Button>
            </form>
        );
        if (this.state.loading) {
           form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;