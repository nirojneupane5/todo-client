import { TodoResponse, deleteTodo, displayTodo } from "@/api/TodoApi";
import { useQuery, useMutation, useQueryClient } from "react-query";
const ViewTodo = () => {
  const queryClient = useQueryClient();
  const { data: todoData } = useQuery<TodoResponse[]>({
    queryKey: "todos",
    queryFn: displayTodo,
  });

  const mutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch

      queryClient.invalidateQueries("todos");
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      {todoData &&
        todoData.map((info, index) => (
          <div key={index} className="bg-red-400 text-white ">
            <h1>{info.task_name}</h1>
            <p>{info.desc}</p>
            <button
              onClick={() => {
                handleDelete(info.id);
              }}
              className="bg-black text-white"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default ViewTodo;
