import { IToDo } from "./MainContent";
interface ToDoProps {
  toDoData: IToDo;
  setToDoArr: React.Dispatch<React.SetStateAction<IToDo[]>>;
}

export const ToDo = ({toDoData, setToDoArr}: ToDoProps): JSX.Element => {
  return (
   
      <div className="ToDoText" >{toDoData.text}</div>
    
  );
};
