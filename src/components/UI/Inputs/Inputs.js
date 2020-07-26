import React from 'react';
import classes from './Inputs.module.css'


const input = (props) => {

    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    if (props.invalid && props.touched) {
       validationError = <p className={classes.ValidationError}>
      {props.elementConfig.placeholder}  {props.value} is not valid, try again
       </p>;
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