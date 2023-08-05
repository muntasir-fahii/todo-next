"use client";

import EditTaskForm from "@/components/EditTaskForm";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface taskData {
  id: string;
  text: string;
  status: string;
}

const EditTask: React.FC = () => {
  const [task, setTask] = useState<taskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const { id } = params;

  // const router=useRouter()
  console.log(task);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, setTask]);

  // useEffect(()=>{
  //   if(!session){
  //    router.push("/")
  //   }
  // },[router,session])

  return <>{task && <EditTaskForm task={task} />}</>;
};
export default EditTask;
