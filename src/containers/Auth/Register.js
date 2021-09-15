import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Inputs/Inputs';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
class Register extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false
            },
        },
        isRegister: true
    }

    checkForValidation(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkForValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    handleConfirmPassword = (event) => {
        if (event.target.value !== this.state.controls.confirmPassword) {
            alert('error');
            this.setState({ confirmPassword: event.target.value })
        }
    }
    switchAuthHandler = () => {
        this.setState(preveState => {
            return { isRegister: !preveState.isRegister }
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
      if(this.state.controls.password.value !== this.state.controls.confirmPassword.value){
          alert("Password donn't match!")
      }else{
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.confirmPassword);
      }
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {<h2>Register</h2>}
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <p>Don't have an account?, please</p>
                <Button
                    clicked={this.switchAuthHandler}
                    btnType="Default">{this.state.isRegister ? 'Register' : 'Login'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, confirmPassword) => dispatch(actions.auth(email, password, confirmPassword)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/login'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);