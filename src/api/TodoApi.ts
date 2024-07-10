import axios from "axios";

type TodoForm = {
  task_name: string;
  desc: string;
  idOfUser_fk:number | null
};

export type TodoResponse = {
  id: number;
  task_name: string;
  desc: string;
  status: boolean;
};

// Route 1: Add todo
export const addTodo = async (data: TodoForm) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post("http://127.0.0.1:8000/todo/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Route 2: Display todo
export const displayTodo = async (userId:string | null) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`http://127.0.0.1:8000/todo/?idOfUser_fk=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Route 3: Delete todo
export const deleteTodo = async (id: number) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(`http://127.0.0.1:8000/todo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
