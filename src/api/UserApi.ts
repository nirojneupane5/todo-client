import axios from "axios"
type TUser={
    first_name:string;
    last_name:string;
    username:string;
    email:string;
    password:string;
    password2:string;
}

export const registerUser=async(data:TUser)=>{
    const response=await axios.post(`http://127.0.0.1:8000/register/`,data)
    return response.data;
} 