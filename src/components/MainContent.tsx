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

  const getToDoArr = async () => {
    console.log("getToDoArr function is running!")
    try {
    const response = await axios.get(baseUrl+"/to-dos");
    setToDoArr(response.data); 
    } catch (error){
      console.error("Oops... there was an issue with your GET request: ", error)
    }
  }

  useEffect(() => {
    getToDoArr();
  },[])

  return (
    <div className="mainContentWrapper">
      <ToDoListView toDoArr={toDoArr} setToDoArr={setToDoArr} inputText={inputText} setInputText={setInputText}/>
    </div>
  );
};
