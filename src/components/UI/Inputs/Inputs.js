import React from 'react';
import classes from './Inputs.module.css'


const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    let validationError = null;
    
    if(props.invalid && props.touched){
        validationError = <p>Please enter a valid value</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
               onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value}
                        value={option.value} onChange={props.changed}>
                        {option.displayValue}
                    </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
               
            />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Labe}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}
export default input;