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
};

type TodoUpdateData={
  task_name: string;
  desc: string;
  id:number;
}
const apiUrl = import.meta.env.VITE_API_URL;
// Route 1: Add todo
export const addTodo = async (data: TodoForm) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(`${apiUrl}/todo/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Route 2: Display todo
export const displayTodo = async (userId:string | null,) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${apiUrl}/todo/?idOfUser_fk=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Route 3: Delete todo
export const deleteTodo = async (id: number) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(`${apiUrl}/todo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const updateTodo = async (data:TodoUpdateData) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.put(`${apiUrl}/todo/${data.id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};