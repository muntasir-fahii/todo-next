"use client";

import { useState } from "react";
import variables from "../app/varibles.module.scss";
import Link from "next/link";

const EditTaskForm = ({ task }: { task: any }) => {
  const [text, setText] = useState(task?.text);
  const [status, setStatus] = useState(task?.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { _id } = task;

  // update task
  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const obj = { text };
    setLoading(true);
    const res = await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const json = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError("update not successful");
    }
    if (res.ok) {
      setLoading(false);
      setError("");
    }
  };

  return (
    <form onSubmit={handleUpdate} className={variables.form}>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        value={text}
        required
        className={variables.input}
        placeholder="task"
      />
      <button type="submit" className={variables.editbtn}>
        <Link href="/" className={variables.link}>
          Edit Task
        </Link>
      </button>
    </form>
  );
};

export default EditTaskForm;
