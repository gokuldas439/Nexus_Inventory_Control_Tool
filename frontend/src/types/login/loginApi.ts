export interface IAuth {
    data: {
      token: string;
      role: 'admin' | 'user' | 'client' | 'supplier' | 'company' | null;
    };
  }


export interface userlogin {
    email: string;
    password: string;
  }


  export type TLoginApiResponse = IAuth['data'] & {
    message: string;
  };


  export interface editProduct{
    name:string,
    price:number,
    color:string,
    description:string,
    stock:number,
    materialId:Array<string>,
    images:File

  }