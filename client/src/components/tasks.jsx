import { useSelector } from "react-redux";
import TaskCard from "./task-card";
import { useDashboardContext } from "../layouts/dashboard-layout";

const RunningTasks = () => {
  const { all_todo } = useSelector(state => state.todo);
  const { type } = useDashboardContext();

  if (!all_todo.length) {
    return <p className="text-center font-medium">Tasks not found</p>;
  }

  const tasks = () => {
    switch (type) {
      case "all":
        return all_todo;
      case "running":
        return all_todo.filter(task => !task.status);
      case "completed":
        return all_todo.filter(task => task.status);
      default:
        return all_todo;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-center font-bold text-[28px] xl:text-[25px] lg:text-[22px] md:text-[20px] sm:text-[18px] mb-[7px]">
        {type === "all" && "All Tasks"}
        {type === "running" && "Running Tasks"}
        {type === "completed" && "Completed Tasks"}
      </h2>
      <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-[15px]">
        {tasks().map(todo => (
          <TaskCard key={todo._id} {...todo} />
        ))}
      </div>
    </div>
  );
};
export default RunningTasks;
