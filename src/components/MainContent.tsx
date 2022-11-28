import { useState } from "react";
import { ToDoListView } from "./ToDoListView";
export interface IToDo {
  text: string;
  complete: boolean;
  id: number;
}

export const MainContent = (): JSX.Element => {
  const [toDoArr, setToDoArr] = useState<IToDo[]>([]);

  return (
    <div className="mainContentWrapper">
      <ToDoListView toDoArr={toDoArr} setToDoArr={setToDoArr} />
    </div>
  );
};
