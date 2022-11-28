import { IToDo } from "./MainContent";
interface ToDoProps {
  toDoData: IToDo;
  handleToggleToDo: (toDoID: number) => void;
}

export const ToDo = ({ toDoData, handleToggleToDo }: ToDoProps): JSX.Element => {
  return (
    <div className={!toDoData.complete ? "toDo" : "strikedToDo"} id={String(toDoData.id)} onClick={e => handleToggleToDo(Number(e.currentTarget.id))}>
      {toDoData.text}
    </div>
  );
};
