import { IToDo } from "./MainContent";
import { ToDo } from "./ToDo";
interface ToDoListViewProps {
  toDoArr: IToDo[];
  setToDoArr: React.Dispatch<React.SetStateAction<IToDo[]>>;
}

export const ToDoListView = ({
  toDoArr,
  setToDoArr,
}: ToDoListViewProps): JSX.Element => {
  return (
    <div className="ToDoListViewWrapper">
      <h4>ToDoListView</h4>

      {toDoArr.map((toDo) => {
        return <ToDo toDoData={toDo} key={toDo.id} setToDoArr={setToDoArr} />;
      })}
    </div>
  );
};
