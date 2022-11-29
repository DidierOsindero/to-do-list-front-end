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
  dBUpdated: boolean;
  setDbUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToDoListView = ({
  toDoArr,
  inputText,
  setInputText,
  getToDoArr,
  postToDoArr,
  patchToDo,
  deleteCompletedToDos,
  dBUpdated,
  setDbUpdated,
}: ToDoListViewProps): JSX.Element => {
  //HANDLERS
  const handleAddToDo = (
    e: React.FormEvent<HTMLFormElement>,
    toDoText: string
  ) => {
    e.preventDefault();
    if (inputText !== "") {
      postToDoArr(toDoText).then(() => getToDoArr());
      setInputText("");
    }
  };

  const handleToggleTodo = async (toDoID: number, isToDoComplete: boolean) => {
    await patchToDo(String(toDoID), isToDoComplete);
    getToDoArr();
  };

  const handleDeleteCompleted = () => {
    deleteCompletedToDos().then(() => getToDoArr());
  };

  return (
    <div className="ToDoListViewWrapper">
      <form onSubmit={(e) => handleAddToDo(e, inputText)}>
        <div className="inputWrapper">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="searchToolButtons">
          <input className="submitButton" type="submit" value="Add" />
          <button
            className="deleteCompletedButton"
            onClick={handleDeleteCompleted}
          >
            Delete Completed
          </button>
        </div>
      </form>

      <ul className="to-do-list-constainer">
        {toDoArr.map((toDo) => {
          return (
            <div key={toDo.id}>
              <ToDo toDoData={toDo} handleToggleToDo={handleToggleTodo} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
