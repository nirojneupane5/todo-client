import axios from "axios"
type TodoForm={
    task_name:string;
    desc:string
}

export type TodoResponse={
    id:number;
    task_name:string;
    desc:string;
    status:boolean
}

//Route 1: Add todo
export const addTodo=async(data:TodoForm)=>{
    const response= await axios.post("http://127.0.0.1:8000/todo/",data)
    return response.data
}

//Route 2: Display todo
export const displayTodo=async()=>{
    const response=await axios.get("http://127.0.0.1:8000/todo/");
    return response.data;
}