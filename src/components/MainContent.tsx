import { useEffect, useState } from "react";
import { ToDoListView } from "./ToDoListView";
import  axios  from "axios";

export interface IToDo {
  text: string;
  complete: boolean;
  id: number;
}

//Change baseUrl depending on environment
const baseUrl = process.env.NODE_ENV === "production" ? "BLAH BLAH BLAH" : "http://localhost:4000";

export const MainContent = (): JSX.Element => {
  const [toDoArr, setToDoArr] = useState<IToDo[]>([]);
  const [inputText, setInputText] = useState<string>("");

  //GET to dos from API
  const getToDoArr = async () => {
    console.log("getToDoArr function is running!")
    try {
    const response = await axios.get(baseUrl+"/to-dos");
    setToDoArr(response.data); 
    } catch (error){
      console.error("Oops... there was an issue with your GET request: ", error)
    }
  }

  //POST to dos to API
  const postToDoArr = async (toDoText: string) => {
    console.log("postToDoArr function is running!")
    try {
      axios.post(baseUrl+"/to-dos", {text: toDoText});
    } catch (error){
      console.error("Oops... there was an issue with your POST request: ", error)
    }
  }

  //PATCH a to do
  const patchToDo = async (toDoID: string, isComplete: boolean) => {
    console.log("patchToDo function is running!")
    try {
      axios.patch(baseUrl+"/to-dos/"+toDoID, {complete: !isComplete});
    } catch (error){
      console.error("Oops... there was an issue with your PATCH request: ", error)
    }
  }

  //GET to dos stored on server DB on mount
  useEffect(() => {
    getToDoArr();
  },[])

  return (
    <div className="mainContentWrapper">
      <ToDoListView toDoArr={toDoArr} setToDoArr={setToDoArr} patchToDo={patchToDo} inputText={inputText} setInputText={setInputText} getToDoArr={getToDoArr} postToDoArr={postToDoArr}/>
    </div>
  );
};
