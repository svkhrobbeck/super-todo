import { Helmet } from "react-helmet";
import axios from "axios";
import { Tasks, SearchContainer } from "../components";
import { setTodo, setTotalPages } from "../slices/todo";
import store from "../store";

export const homeLoader = async () => {
  try {
    const { data } = await axios.get("/todo");
    store.dispatch(setTodo(data.all_todo));
    store.dispatch(setTotalPages(data.total_pages));
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
        <SearchContainer />
        <Tasks />
      </div>
    </>
  );
};
export default HomePage;
