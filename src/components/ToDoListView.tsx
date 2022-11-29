import { IToDo } from "./MainContent";
import { ToDo } from "./ToDo";
interface ToDoListViewProps {
  toDoArr: IToDo[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  getToDoArr: () => Promise<void>;
  postToDoArr: (toDoText: string) => Promise<void>;
  patchToDo: (toDoID: string, isComplete: boolean) => Promise<void>;
  deleteCompletedToDos: () => Promise<void>;
}

export const ToDoListView = ({
  toDoArr,
  inputText,
  setInputText,
  getToDoArr,
  postToDoArr,
  patchToDo,
  deleteCompletedToDos
}: ToDoListViewProps): JSX.Element => {

  //HANDLERS
  const handleAddToDo = (
    e: React.FormEvent<HTMLFormElement>,
    toDoText: string
  ): void => {
    e.preventDefault();
    if (inputText !== "") {
      postToDoArr(toDoText);
      getToDoArr();
      setInputText("");
    }
  };

  const handleToggleTodo = (toDoID: number, isToDoComplete: boolean) => {
    patchToDo(String(toDoID), isToDoComplete);
    getToDoArr();
  };

  const handleDeleteCompleted = () => {
    deleteCompletedToDos();
    getToDoArr();
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


        <button onClick={handleDeleteCompleted}>Delete Completed</button>
    </div>
  );
};
