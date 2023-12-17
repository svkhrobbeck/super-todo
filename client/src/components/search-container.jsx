import { useDispatch } from "react-redux";
import { FormInput } from ".";
import errorToast from "../helpers/errorToast";
import { useDashboardContext } from "../layouts/dashboard-layout";
import { getRequest } from "../service/request";
import { setTodo } from "../slices/todo";
import { useRef } from "react";

const SearchContainer = () => {
  const { type, setType } = useDashboardContext();
  const dispatch = useDispatch();
  const timeoutId = useRef();

  const handleSearchInput = e => {
    clearTimeout(timeoutId.current);

    try {
      timeoutId.current = setTimeout(async () => {
        const data = await getRequest("/todo", { search: e.target.value });
        dispatch(setTodo(data.all_todo));
      }, 400);
    } catch (err) {
      console.log(err);
      errorToast(err);
    }
  };

  return (
    <div className="max-w-[700px] py-[10px] mx-auto">
      <div className="flex gap-[10px]">
        <select
          className="bg-teal-600 text-white rounded"
          name="type"
          defaultValue={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="all">all</option>
          <option value="running">running</option>
          <option value="completed">completed</option>
        </select>
        <FormInput name="search" disableLabel onChange={handleSearchInput} />
      </div>
    </div>
  );
};
export default SearchContainer;
