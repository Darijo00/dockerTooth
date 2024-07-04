import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/auth/authslice';
import Input from '@mui/material/Input';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CRow,
} from '@coreui/react'
import Toothlogo from '../../../assets/images/Tooth_logo.png';
import tick from '../../../assets/images/charm_tick.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setIsValid(validateEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (auth.status === 'succeeded') {
      console.log("Token is ", auth.token)
      navigate('/dashboard/patients');
    }
  }, [auth.status, navigate]);

  const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className='w-75'>
              <CCard className="p-4">
                <CCardBody>
                <CForm>
                  <div className="d-flex justify-content-center align-items-center p-5 m-4">
                    <img className="d-block w-25 h-25" src={Toothlogo} alt="slide 1" />
                  </div>
                  <CInputGroup className="d-flex justify-content-center flex-column mb-3">
                    <div className="d-block text-body-primary fw-bold">EMAIL</div>
                    <div className="position-relative">
                      <Input
                        onChange={handleEmailChange}
                        placeholder="Input your email"
                        inputProps={{ 'aria-label': 'email' }}
                        value={email}
                        fullWidth
                      />
                      {isValid && (
                        <img src={tick} alt="slide 1" style={{position: 'absolute', width: '16px', height:'16px', transform: 'translateY(-50%)', right:'10px', top:'50%'}} />
                      )}
                    </div>
                  </CInputGroup>
                  <CInputGroup className="d-flex justify-content-center flex-column mb-4">
                    <div className="d-block text-body-primary fw-bold">PASSWORD</div>
                    <div className="position-relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Input your password"
                        inputProps={{ 'aria-label': 'password' }}
                        onChange={handlePasswordChange}
                        value={password}
                        fullWidth
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: '#2e5aab'
                        }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                  </CInputGroup>
                  {auth.status === 'failed' && <p style={{ color: 'red' }}>{auth.error}</p>}
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <CButton color="primary" className="px-4 w-100" onClick={handleSubmit}>
                      Sign In
                    </CButton>
                    <CButton className="px-0 p-4">
                      Forgot password?
                    </CButton>
                  </div>
                </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
