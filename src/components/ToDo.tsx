import { IToDo } from "./MainContent";
interface ToDoProps {
  toDoData: IToDo;
  setToDoArr: React.Dispatch<React.SetStateAction<IToDo[]>>;
}

export const ToDo = (toDoData: ToDoProps): JSX.Element => {
  return (
    <div className="ToDoWrapper">
      <div>ToDo</div>
    </div>
  );
};
