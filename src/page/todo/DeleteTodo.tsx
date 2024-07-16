import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "@/api/TodoApi";

type TDeleteTodoProp = {
  id: number;
};
const DeleteTodo = ({ id }: TDeleteTodoProp) => {
  const queryClient = useQueryClient();
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
    <div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteTodo;
