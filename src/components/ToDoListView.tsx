import { useState } from "react";
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
    const [inputText, setInputText] = useState<string>('');

    //HANDLERS
    const handleAddToDo = (e:  React.FormEvent<HTMLFormElement>, toDoText: string):void => {
        e.preventDefault();
        if (inputText !== "") {
        setToDoArr(prev => [...prev, {text: toDoText, complete: false, id: prev.length + 1}]);
        setInputText("");
        }
    }

  return (
    <div className="ToDoListViewWrapper">  
      <ul>
        {toDoArr.map((toDo) => {
          return (
            <div key={toDo.id}>
              <ToDo toDoData={toDo} setToDoArr={setToDoArr} />
            </div>
          );
        })}
      </ul>

      <form onSubmit={(e) => handleAddToDo(e, inputText)}>
        <input value={inputText} onChange={(e)=> setInputText(e.target.value)}/>
        <input type="submit" value="Add"/>
      </form>
    </div>
  );
};
