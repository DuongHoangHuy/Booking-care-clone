import axios from 'axios';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './ModalUser.scss'

class ModalUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            address: ''
        }
    }

    componentDidMount() {
        console.log('didmount modal ')
    }

    toggle = ()=>{
        this.props.toggleModal()
    }

    handleOnChange = (e, field)=>{
        const copyState = {... this.state}
        copyState[field] = e.target.value
        this.setState({... copyState})
    }

    validateData = ()=>{ 
        const arrInputField = ['email', 'password', 'firstname', 'lastname', 'address']
        for(let field of arrInputField){
            if(!this.state[field]) {
                alert(`Missing ${field}`)
                return false
            }
        }
        return true;
    }

    handleAddnewUser = async ()=>{
        const isValid = this.validateData()
        if(isValid){
            await this.props.addNewUser(this.state)
            //clear old data
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                address: ''
            })
        }
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=> {this.toggle()}} 
                className='modal-container lg'
                size='lg'
            >
                <ModalHeader toggle={()=> {this.toggle()}}>Modal title</ModalHeader>
                <ModalBody className='modal-body-container'>
                    <div className='row-container'>
                        <div className='input-container'>
                            <label for='email'>Email</label>
                            <input onChange={(e)=>{this.handleOnChange(e, 'email')}} type='email' name='email'></input>
                        </div>
                        <div className='input-container'>
                            <label for='password'>Password</label>
                            <input onChange={(e)=>{this.handleOnChange(e, 'password')}} type='password' name='password'></input>
                        </div>
                    </div>
                    <div className='row-container'>
                        <div className='input-container'>
                            <label for='firstname'>Firstname</label>
                            <input onChange={(e)=>{this.handleOnChange(e, 'firstname')}} type='firstname' name='firstname'></input>
                        </div>
                        <div className='input-container'>
                            <label for='lastname'>Lastname</label>
                            <input onChange={(e)=>{this.handleOnChange(e, 'lastname')}} type='lastname' name='lastname'></input>
                        </div>
                    </div>
                    <div className='row-container max-width'>
                        <div className='input-container max-size'>
                            <label for='address'>Address</label>
                            <input onChange={(e)=>{this.handleOnChange(e, 'address')}} type='address' name='address'></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> {this.handleAddnewUser()}}>Add new</Button>{' '}
                    <Button color="secondary" onClick={()=> {this.toggle()}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
