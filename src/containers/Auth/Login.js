import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService'
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: true,
            errMessage: ''
        }
    }
    handleUserName = (event)=>{
        this.setState({
            userName: event.target.value
        })
    }

    handlePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async ()=>{
        try{
            this.setState({errMessage: ''})
            const data = await handleLoginApi(this.state.userName, this.state.password)
            if(data && data.errCode == 0){
                //login succeed
                this.props.userLoginSuccess(data.user)
            }else{
                this.setState({errMessage: data.message})
            }
        }catch(e){
            if(e.response && e.response.data){
                this.setState({errMessage: e.response.data.message})
            }
        }        
    }

    toggleShowPassword = () =>{
        this.setState(prev => ({isShowPassword: !prev.isShowPassword}))
    }
    

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='text-login'>Login</div>
                        <div class="form-group login-input">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp" 
                                placeholder='User name'
                                value={this.state.userName}
                                onChange={(event)=> this.handleUserName(event)}
                                />
                        </div>
                        <div class="form-group login-input">
                            <label for="exampleInputPassword1">Password</label>
                            <div className='custom-password-input'>
                                <input type={this.state.isShowPassword ? "text" : "password"} class="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={(event)=> this.handlePassword(event)}
                                />
                                <span onClick={()=> {this.toggleShowPassword()}}>
                                <i class={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"} ></i>
                                </span>
                                
                            
                            </div>
                            
                        </div>
                        <button 
                            type="submit" 
                            class="login-btn"
                            onClick={()=> this.handleLogin()}
                            >Submit
                        </button>
                        <div style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='login-forgot-pw'>Forgot your password? </div>
                        <div className='login-ask'>Or login with:</div>
                        <div className="login-with-social">
                            <i class="fab fa-google-plus google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
