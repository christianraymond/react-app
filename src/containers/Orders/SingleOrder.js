import React from 'react';
import classes from './SingleOrder.module.css';

const singleOrder = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
                backgroundColor: 'yellow'
            }}
            key={ig.name}>{ig.name} ({ig.amount})
        </span>
    });
    return (
        <div className={classes.SingleOrder}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>R{Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <strong style={{color:'orange'}}>Your</strong>
            <p>Name: {props.customer.name}</p>
            <p>Country: {props.customer.country}</p>
            <p>Street: {props.customer.street}</p>
            <p>ZipCode: {props.customer.zipCode}</p>
            <p>Email: {props.customer.email}</p>
            <p>Deliver-Mode: {props.customer.deliveryMethod}</p>
        </div>
    )
}

export default singleOrder;