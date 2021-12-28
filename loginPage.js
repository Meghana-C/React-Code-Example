
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { commonApi } from '../actions';
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isFromValid: false,
      errors: {}
    }
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value) {
      this.setState({
        errors: Object.assign(this.state.errors, { [event.target.name]: "" })
      });
    }
  }

  loginFunc = async (event) => {
    event.preventDefault();
    try 
    {
      let { userName, password} = this.state;
  
      if (this.validateForm()) {
        const response = await this.props.commonApi('login','','get', 'LOGIN');
        console.log(response)
        if( response.status === 200)
        {
          if ((userName == response.data.username) && (password == response.data.password))
            this.props.history.push('/employee-list');
          else
            swal("Enter Valid Username and Password",'','error')
        }
        }
    }
    catch (err)
    {
      throw(err);
    }
  
    }
   
  validateForm =() => {
    let { userName, password } = this.state
    let errors = {}
    let isFromValid = false;
    if (!userName || userName.trim() === '') {
      errors['userName'] = 'Enter User Name'
    }
    if (!password || password.trim() === '')
      errors['password'] = 'Enter Password';
    this.setState({ errors: errors });
     isFromValid = true;
     return isFromValid;
  }

  render() {
    let { userName, password, errors } = this.state;
    return (

      <div className='container-scroller'>
        <div className='container-fluid page-body-wrapper full-page-wrapper'>
          <div className='col-md-4 authentication-form'>
            <form autoComplete='off' onSubmit={this.loginFunc}>
              <h3 className='pb-2 text-center'>
                Login Page
                         </h3>
              <div className='form-group'>
                <input
                  type='text'
                  className={errors.userName ? 'form-control input-error' : 'form-control'}
                  name='userName'
                  value={userName}
                  id='user-name'
                  placeholder='Enter User Name'
                  onChange={this.handleChange}
                />
                <i className='fa fa-user' aria-hidden='true' />
                <span className='error-block'>{errors.userName}</span>
              </div>
              <div className='form-group'>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={password}
                  id='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                />
                <i className='fa fa-lock' aria-hidden='true' />
                <span className='error-block'>{errors.password}</span>
              </div>
              <div className='mt-5'>
                <button className='btn btn-block btn-primary btn-lg font-weight-medium' type='submit' > Login </button>
              </div>
              <div className='row'>
                <div className='col-md-6 col-sm-6'>
                  <div className='checkbox mt-3'>
                 
                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>


    );
  }
}
function mapStateToProps(state) {
  return {
    loginData: state.commonReducer.login
  };
}


export default withRouter(connect(mapStateToProps, {commonApi})(LoginPage));