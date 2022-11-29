import { useEffect, useState } from "react";
import { ToDoListView } from "./ToDoListView";
import axios from "axios";

export interface IToDo {
  text: string;
  complete: boolean;
  id: number;
}

//Change baseUrl depending on environment
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://didiers-to-do-list-server.onrender.com"
    : "http://localhost:4000";

export const MainContent = (): JSX.Element => {
  //STATES
  const [toDoArr, setToDoArr] = useState<IToDo[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [dBUpdated, setDbUpdated] = useState<boolean>(false);

  //Update toDos on mount
  useEffect(() => {
    getToDoArr();
  }, []);

  //GET to dos from API
  const getToDoArr = async () => {
    console.log("getToDoArr function is running!");
    try {
      const response = await axios.get(baseUrl + "/to-dos");
      setToDoArr(response.data);
    } catch (error) {
      console.error(
        "Oops... there was an issue with your GET request: ",
        error
      );
    }
  };

  //POST to do to API
  const postToDoArr = async (toDoText: string) => {
    console.log("postToDoArr function is running!");
    try {
      await axios.post(baseUrl + "/to-dos", { text: toDoText });
    } catch (error) {
      console.error(
        "Oops... there was an issue with your POST request: ",
        error
      );
    }
  };

  //PATCH a to do
  const patchToDo = async (toDoID: string, isComplete: boolean) => {
    console.log("patchToDo function is running!");
    try {
      await axios.patch(baseUrl + "/to-dos/" + toDoID, {
        complete: !isComplete,
      });
    } catch (error) {
      console.error(
        "Oops... there was an issue with your PATCH request: ",
        error
      );
    }
  };

  //DELETE completed to dos
  const deleteCompletedToDos = async () => {
    console.log("deleteCompletedToDos function is running!");
    try {
      await axios.delete(baseUrl + "/completed-to-dos/");
    } catch (error) {
      console.error(
        "Oops... there was an issue with your DELETE (completed to dos) request: ",
        error
      );
    }
  };

  return (
    <div className="mainContentWrapper">
      <ToDoListView
        toDoArr={toDoArr}
        patchToDo={patchToDo}
        inputText={inputText}
        setInputText={setInputText}
        getToDoArr={getToDoArr}
        postToDoArr={postToDoArr}
        deleteCompletedToDos={deleteCompletedToDos}
        dBUpdated={dBUpdated}
        setDbUpdated={setDbUpdated}
      />
    </div>
  );
};
