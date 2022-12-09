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

  const sortedToDoArr = toDoArr.sort((a,b): number => {
    if (a.id > b.id) {
      return -1
    }

    if (a.id < b.id) {
      return 1
    }

    return 0;
  })

  return (
    <div className="ToDoListViewWrapper">
      <form onSubmit={(e) => handleAddToDo(e, inputText)}>
        <div className="inputWrapper">
          <input
            className="inputBar"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a task..."
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
      <hr />
      <ul className="to-do-list-constainer">
        {sortedToDoArr.map((toDo) => {
          return (
            <ToDo
              toDoData={toDo}
              key={toDo.id}
              handleToggleToDo={handleToggleTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};
