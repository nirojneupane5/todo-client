import AddTodo from "./AddTodo";

import LogOut from "./LogOut";
import ViewTodo from "./ViewTodo";

const Todo = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #5761B2, #1FC5A8)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-2 py-2">
        <div className="flex items-end justify-end">
          <LogOut />
        </div>
        <div className="flex flex-col justify-between gap-5">
          <AddTodo />
          <ViewTodo />
        </div>
      </div>
    </div>
  );
};

export default Todo;
