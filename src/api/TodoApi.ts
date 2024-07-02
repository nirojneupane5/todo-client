import axios from "axios"
type TodoForm={
    task_name:string;
    desc:string
}

//Route 1: Add todo
export const AddTodo=async(data:TodoForm)=>{
    const response= await axios.post("http://127.0.0.1:8000/todo/",data)
    return response.data
}