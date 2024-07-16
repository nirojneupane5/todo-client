import { TodoResponse, displayTodo } from "@/api/TodoApi";
import { useQuery } from "react-query";
import { useAuth } from "@/context/AuthContextProvider";
import ViewSingleTodo from "./ViewSingleTodo";
import { Suspense } from "react";
import Loading from "@/components/loading/Loading";

const ViewTodo = () => {
  const { userId } = useAuth();

  const { data: todoData } = useQuery<TodoResponse[]>({
    queryKey: "todos",
    queryFn: () => displayTodo(userId),
  });
  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {todoData &&
          todoData.map((info, index) => (
            <ViewSingleTodo
              key={index}
              id={info.id}
              task_name={info.task_name}
              desc={info.desc}
            />
          ))}
      </div>
    </Suspense>
  );
};

export default ViewTodo;
