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

export const registerUser=async(data:TUserSignUp)=>{
    const response=await axios.post(`http://127.0.0.1:8000/register/`,data)
    return response.data;
} 

export const loginUser=async(data:TUserLogin)=>{
    const response=await axios.post(`http://127.0.0.1:8000/login/`,data)
    return response.data;
}