import { useEffect, useState, useCallback } from "react";
import TodosList from "./components/TodosList";

const dumyList = [
  {
    id: "1",
    title: "New Side Project",
    isDone: false,
  },
  { id: "2", title: "Ski Holiday Vacation ", isDone: false },
  {
    id: "3",
    title: "Home Renovation",
    isDone: false,
  },
  {
    id: "4",
    title: "Family Visit",
    isDone: false,
  },
  {
    id: "5",
    title: "Family Visit",
    isDone: false,
  },
];




function App() {
  const [renderList, setRenderList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  console.log("App")

  const fetchData = useCallback(async () => {
    
   const response = await fetch("https://todolist-adc62-default-rtdb.firebaseio.com/todoList.json")
   if(!response.ok){
     throw new Error('Something went wrong')
   }
          const responseData = await response.json()
          
            const loadedTodos = [];

            for (const key in responseData) {
              loadedTodos.push({
                id: responseData[key].id,
                title: responseData[key].title,
                isDone: responseData[key].isDone,
              });
            }
    
            console.log("loaded", loadedTodos);
            
            if(loadedTodos){
              setRenderList(loadedTodos);
              setIsLoading(false);
            }
        
          
    
    },[])


  useEffect(() => {
    fetchData().catch((error) => {
      setIsLoading(false);
      setError("Can not connect to internet");
    });
  }, [fetchData]);

if(isLoading){
  return <p className="mt-5 text-center" >Loading...</p> 
}

if(error){
  return <p className="mt-5 text-center">{error}</p>
}

  console.log("props");
  return (
    <div className="container mt-6">
      <TodosList dummyList={renderList} />
    </div>
  );
}

export default App;
