import axios from "axios"
type TUserSignUp={
    first_name:string;
    last_name:string;
    username:string;
    email:string;
    password:string;
    password2:string;
}

type TUserLogin={
    username:string;
    password:string
}

export type TLoginResponse={
  refresh:string;
  access:string
}
const apiUrl = import.meta.env.VITE_API_URL;
export const registerUser=async(data:TUserSignUp)=>{
    const response=await axios.post(`${apiUrl}/register/`,data)
    return response.data;
} 

export const loginUser=async(data:TUserLogin)=>{
    const response=await axios.post(`${apiUrl}/login/`,data)
    return response.data;
}