import { Helmet } from "react-helmet";
import { CompletedTasks, RunningTasks } from "../components";
import axios from "axios";
import { setTodo } from "../slices/todo";
import store from "../store";

export const homeLoader = async () => {
  try {
    const { data } = await axios.get("/todo");
    store.dispatch(setTodo(data.all_todo));
    return data;
  } catch (err) {
    return err;
  }
};

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Application | Dashboard</title>
      </Helmet>
      <div className="container">
        <div className="flex w-full gap-[12px] border-t border-black">
          <RunningTasks />
          <div className="border-l border-black" />
          <CompletedTasks />
        </div>
      </div>
    </>
  );
};
export default HomePage;
