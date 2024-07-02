import { TodoResponse, displayTodo } from "@/api/TodoApi";
import { useQuery } from "react-query";
const ViewTodo = () => {
  const { data: todoData } = useQuery<TodoResponse[]>({
    queryKey: "todos",
    queryFn: displayTodo,
  });

  return (
    <div>
      {todoData &&
        todoData.map((info, index) => (
          <div key={index}>
            <h1>{info.task_name}</h1>
            <p>{info.desc}</p>
          </div>
        ))}
    </div>
  );
};

export default ViewTodo;
