import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { FiVideo } from "react-icons/fi";
// import { useTodosContext } from "../hooks/useTodosContex";

const TaskList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);

  console.log(tasks);
  // fetched all todo
  useEffect(() => {
    const getAllTodo = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tasks");
        const json = await res.json();
        if (res.ok) {
          // dispatch({ type: "SET_TODOS", payload: json });
          console.log(json);
          setTasks(json);
        }
        setLoading(false);
        setError("");
      } catch (error) {
        setLoading(false);

        setError("failed to fetched data");
      }
    };
    getAllTodo();
  }, []);

  return (
    <div>
      {tasks.map((task: any) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
