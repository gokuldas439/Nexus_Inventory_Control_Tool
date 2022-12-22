import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userlogin } from '../../../types/login/loginApi';
import { SubmitHandler } from 'react-hook-form';

import { setToken, useUserLoginMutation } from "../../../redux/reducers/api/authSlice";
import Login from "../../landingPage/login/Login"

function UserLogin() {
    const [userLogin,{isLoading}]=useUserLoginMutation()

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formSubmit: SubmitHandler<userlogin> = async (data) => {
    if (!isLoading) {
      try {
        const res = await userLogin(data).unwrap();
        console.log(res)
        if (res.message === 'success') {
          dispatch(setToken(res));
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
          navigate('/');
        }
      } catch (err: any) {
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
<Login formSubmit={formSubmit}/>  )
}

export default UserLogin