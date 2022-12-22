import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler } from 'react-hook-form';
import Login from '../../pages/landingPage/login/Login';
import UserLoginComponent from '../userlogin/UserLoginComponent';
import './CompanyLogin.css'
import { setCompanyToken, setToken, useCompanyLoginMutation } from '../../redux/reducers/api/authSlice';
import { userlogin } from '../../types/login/loginApi';
import { store } from '../../redux/App/store';

function CompanyLogin() {
  const [companyLogin,{isLoading}]=useCompanyLoginMutation()
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  console.log(store)

  const formSubmit: SubmitHandler<userlogin> = async (data) => {
    if (!isLoading) {
      try {
        const res = await companyLogin(data).unwrap();
        console.log(res)
        if (res.message === 'success') {
          dispatch(setCompanyToken(res));
          toast.success('Login Successful...', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: true
          });
          navigate('/company/dashboard');
        }
      } catch (err: any) {
        console.log(err)
        toast.error(`${err?.data?.message}`, {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          closeButton: true
        });
      }
    }
  };


  return (
<Login formSubmit={formSubmit}/>
  )
}

export default CompanyLogin;