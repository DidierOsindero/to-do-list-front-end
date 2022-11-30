import { IToDo } from "./MainContent";
interface ToDoProps {
  toDoData: IToDo;
  handleToggleToDo: (toDoID: number, isToDoComplete: boolean) => void;
}

export const ToDo = ({
  toDoData,
  handleToggleToDo,
}: ToDoProps): JSX.Element => {
  return (
    <div
      className= "toDo" 
      id={String(toDoData.id)}
      onClick={(e) =>
        handleToggleToDo(Number(e.currentTarget.id), toDoData.complete)
      }
    >
      {toDoData.complete && <span>✔️</span>} {toDoData.text}
    </div>
  );
};
