import { useSelector } from "react-redux";
import TaskCard from "./task-card";

const CompletedTasks = () => {
  const { all_todo } = useSelector(state => state.todo);
  const completed_todos = all_todo.filter(todo => todo.status);

  if (!completed_todos.length) {
    return (
      <p className="text-center font-medium w-[50%]">no completed todos left</p>
    );
  }

  return (
    <div className="w-[50%] flex flex-col">
      <h2 className="text-center font-bold text-[18px] mb-[7px]">Completed Tasks</h2>
      <div className="grid grid-cols-2 gap-[15px]">
        {completed_todos.map(todo => (
          <TaskCard key={todo._id} {...todo} />
        ))}
      </div>
    </div>
  );
};
export default CompletedTasks;
