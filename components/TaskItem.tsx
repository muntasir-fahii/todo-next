"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEdit3 } from "react-icons/fi";
import varibles from "../app/varibles.module.scss";
import { PiTrashSimpleBold } from "react-icons/pi";

interface TaskItemProps {
  task: any;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // distructure task
  const { _id, text, status } = task;

  // delete todo
  const handleDelete = async (id: string) => {
    // check user authorization

    setLoading(true);
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    if (!res.ok) {
      setError("delete not successfull");
    }
  };

  return (
    <div className={varibles.task}>
      <div>
        <h4>{text}</h4>
      </div>
      <div>
        <button className={varibles.delete} onClick={() => handleDelete(_id)}>
          {" "}
          <PiTrashSimpleBold />
        </button>
        <Link className={varibles.editlink} href={`/editTask/${_id}`}>
          <FiEdit3 />
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TaskItem;
