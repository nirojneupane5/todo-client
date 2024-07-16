import UpdateTodo from "./UpdateTodo";
import DeleteTodo from "./DeleteTodo";

type TViewSingleTodoProps = {
  id: number;
  task_name: string;
  desc: string;
};

const ViewSingleTodo = ({ id, task_name, desc }: TViewSingleTodoProps) => {
  return (
    <div>
      <div className="bg-blue-600 text-white px-2 py-2 rounded-xl">
        <h1 className="text-2xl font-bold capitalize">{task_name}</h1>
        <p className="text-xl font-semibold">{desc}</p>
        <div className="flex items-center gap-5 py-1">
          <DeleteTodo id={id} />
          <UpdateTodo id={id} task_name={task_name} desc={desc} />
        </div>
      </div>
    </div>
  );
};

export default ViewSingleTodo;
