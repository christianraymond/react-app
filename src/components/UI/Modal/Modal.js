import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    componentDidUpdate(){
        console.log('[Modal] WillUpdate@')
    }
    render() {
        return (
            <Aux>
                <Backdrop showModal={this.props.showModal} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showModal ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;