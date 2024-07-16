import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "@/api/TodoApi";
import { useToast } from "@/components/ui/use-toast";

type TDeleteTodoProp = {
  id: number;
};
const DeleteTodo = ({ id }: TDeleteTodoProp) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation(deleteTodo, {
    onError: () => {
      toast({
        title: "Success",
        description: "Error While deleting Todo",
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
      toast({
        variant: "success",
        title: "Success",
        description: "Todo Delete Successful",
      });
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
