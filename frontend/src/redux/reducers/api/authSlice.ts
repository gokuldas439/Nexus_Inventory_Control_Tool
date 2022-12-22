import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { string } from 'yup'
import { TLoginApiResponse, userlogin } from '../../../types/login/loginApi'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../../App/store';
import { IAuth } from '../../../types/login/loginApi';
import { RootState } from '../../App/store';




export const loginApi=createApi({
    reducerPath:"loginApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://127.0.0.1:5000"}),
    endpoints:(builder)=>({ }),
        })
    
      

      const userLog=loginApi.injectEndpoints({
        endpoints:(builder) =>({
          userLogin: builder.mutation<{ status: string } & TLoginApiResponse, userlogin>({
            query:(data)=>({
            url:'/login',
            method: 'POST',
            body: data
          })
        })
  
        })
      })

export const {useUserLoginMutation}=userLog




 const CompanyloginApi=loginApi.injectEndpoints({

  endpoints:(builder)=>({
    companyLogin: builder.mutation<{ status: string } & TLoginApiResponse, userlogin>({
      query:(data)=>({
        url:'/company/login',
        method: 'POST',
        body: data
      })
    })
  })
})


export const {useCompanyLoginMutation}=CompanyloginApi;
















const data = localStorage.getItem('token') ?? '';
const parsedData: IAuth['data'] | null = data ? JSON.parse(data) : null;
const initialState: IAuth = {
  data: parsedData ?? {
    token: '',
    role: null
  }
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<IAuth['data']>) {
      localStorage.setItem(
        'token',
        JSON.stringify({
          token: action.payload.token,
          role: action.payload.role
        })
      );

      state.data = { token: action.payload.token, role: action.payload.role };
    },
    deleteToken(state) {
      state.data = {
        token: '',
        role: null
      };
      localStorage.removeItem('token');
    }
  }
});




const companyAuthSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyToken(state, action: PayloadAction<IAuth['data']>) {
      localStorage.setItem(
        'token',
        JSON.stringify({
          token: action.payload.token,
          role: action.payload.role
        })
      );

      state.data = { token: action.payload.token, role: action.payload.role };
    },
    deleteCompanyToken(state) {
      state.data = {
        token: '',
        role: null
      };
      localStorage.removeItem('token');
    }
  }
});

export const { setToken, deleteToken } = authSlice.actions;

export const selectUserAuth = (state: RootState) => state.userAuth.data;

export const userAuthReducer = authSlice.reducer;

 

export const selectCompanyAuth = (state: RootState) => state.companyAuth.data;
export const { setCompanyToken, deleteCompanyToken } = companyAuthSlice.actions;
export const companyAuthReducer = companyAuthSlice.reducer;