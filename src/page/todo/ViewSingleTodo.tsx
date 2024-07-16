import { useState } from "react";
import UpdateTodo, { TUpdateTodoProps } from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

type TViewSingleTodoProps = {
  id: number;
  task_name: string;
  desc: string;
};

const ViewSingleTodo = ({ id, task_name, desc }: TViewSingleTodoProps) => {
  const [selectedTodo, setSelectedTodo] = useState<TUpdateTodoProps | null>(
    null
  );
  const handleUpdate = (todo: TUpdateTodoProps) => {
    setSelectedTodo(todo);
  };

  const closeUpdateDialog = () => {
    setSelectedTodo(null);
  };

  return (
    <div>
      <div className="bg-blue-600 text-white px-2 py-2 rounded-xl">
        <h1 className="text-2xl font-bold capitalize">{task_name}</h1>
        <p className="text-xl font-semibold">{desc}</p>
        <DeleteTodo id={id} />
        <button
          onClick={() => {
            handleUpdate({
              id: id,
              task_name: task_name,
              desc: desc,
            });
          }}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 mx-4 my-2"
        >
          Update
        </button>
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

export default ViewSingleTodo;
