import { IToDo } from "./MainContent";
import { ToDo } from "./ToDo";
interface ToDoListViewProps {
  toDoArr: IToDo[];
  setToDoArr: React.Dispatch<React.SetStateAction<IToDo[]>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

export const ToDoListView = ({
  toDoArr,
  setToDoArr,
  inputText,
  setInputText
}: ToDoListViewProps): JSX.Element => {

  //HANDLERS
  const handleAddToDo = (
    e: React.FormEvent<HTMLFormElement>,
    toDoText: string
  ): void => {
    e.preventDefault();
    if (inputText !== "") {
      setToDoArr((prev) => [
        ...prev,
        { text: toDoText, complete: false, id: prev.length + 1 },
      ]);
      setInputText("");
    }
  };

  const handleToggleTodo = (toDoID: number) => {
    setToDoArr(
      toDoArr.map((toDo) => {
        return toDo.id === toDoID
          ? { ...toDo, complete: !toDo.complete }
          : toDo;
      })
    );
  };

  return (
    <div className="ToDoListViewWrapper">
      <ul>
        {toDoArr.map((toDo) => {
          return (
            <div key={toDo.id}>
              <ToDo toDoData={toDo} handleToggleToDo={handleToggleTodo} />
            </div>
          );
        })}
      </ul>

      <form onSubmit={(e) => handleAddToDo(e, inputText)}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
