import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsersApi, handleAddNewUserApi, handleDeleteUserApi} from '../../services/userService'
import ModalUser from './ModalUser'

class UserManage extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            isOpenModal: false
        }
    }

    getAllUsers = async ()=>{
        const usersFetch = await getAllUsersApi('All')
        this.setState({users: usersFetch.users})
    }

    async componentDidMount() {
        await this.getAllUsers()
    }

    handleOpenModal = ()=>{
        this.setState({isOpenModal: true})
    }

    toggleUserModal = ()=>{
        this.setState(prev => ({isOpenModal: !prev.isOpenModal}))
    }

    handleAddNewUser = async (userData)=>{
        const res = await handleAddNewUserApi(userData)
        if(res.errCode == 0){
            await this.getAllUsers()
            this.toggleUserModal()
        }else{
            alert(res.message)
        }
    }

    handleDeleteUser = async(id)=>{
        const res = await handleDeleteUserApi(id)
        if(res.errCode === 0){
            await this.getAllUsers()
        }else{
            console.log(res.message)
        }
    }

    render() {
        return (
            <div className="text-center mt-3">
                <div>Manage user</div>
                <ModalUser 
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleUserModal}
                    addNewUser={this.handleAddNewUser}
                />
                <button onClick={()=>{ this.handleOpenModal() }}>Add new user</button>
                <div className='mt-3 mx-1'>
                    <table id="customers" >
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Action</th> 
                    </tr>
                    {!this.state.users 
                    ? <div> Waiting data...</div>
                    : (this.state.users.map(user =>(
                        <tr>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>
                                <i class="far fa-edit"></i>
                                <i 
                                    class="far fa-trash-alt" 
                                    onClick={()=>{this.handleDeleteUser(user.id)}}
                                ></i>
                            </td>

                        </tr>
                    )))} 
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
