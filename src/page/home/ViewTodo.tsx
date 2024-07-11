import { TodoResponse, deleteTodo, displayTodo } from "@/api/TodoApi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAuth } from "@/context/AuthContextProvider";
import { useState } from "react";
import UpdateTodo, { TUpdateTodoProps } from "./UpdateTodo";

const ViewTodo = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const [selectedTodo, setSelectedTodo] = useState<TUpdateTodoProps | null>(
    null
  );

  const { data: todoData } = useQuery<TodoResponse[]>({
    queryKey: "todos",
    queryFn: () => displayTodo(userId),
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

  const handleUpdate = (todo: TUpdateTodoProps) => {
    setSelectedTodo(todo);
  };

  const closeUpdateDialog = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {todoData &&
          todoData.map((info, index) => (
            <div key={index} className="bg-red-400 text-white">
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
              <button
                onClick={() => {
                  handleUpdate({
                    id: info.id,
                    task_name: info.task_name,
                    desc: info.desc,
                  });
                }}
                className="bg-black text-white mx-4"
              >
                Update
              </button>
            </div>
          ))}
      </div>
      {selectedTodo && (
        <UpdateTodo
          id={selectedTodo.id}
          task_name={selectedTodo.task_name}
          desc={selectedTodo.desc}
          isOpen={!!selectedTodo}
          onClose={closeUpdateDialog}
        />
      )}
    </div>
  );
};

export default ViewTodo;
