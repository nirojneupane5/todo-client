import AddTodo from "./AddTodo";
import LogOut from "./LogOut";
import ViewTodo from "./ViewTodo";

const Home = () => {
  return (
    <div className="max-w-[1320px] mx-auto px-2 py-2">
      <div className="flex justify-between">
        <LogOut />
        <AddTodo />
        <ViewTodo />
      </div>
    </div>
  );
};

export default Home;
