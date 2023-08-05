"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import variables from "../varibles.module.scss";

const AddTask = ({}) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // router
  const router = useRouter();

  // add task
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = { text, status };

    if (!text) {
      setError("must be flied");
    }
    setLoading(true);
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setLoading(false);
      setText("");
      setStatus(false);
      router.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={variables.form}>
        <input
          className={variables.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          type="text"
          placeholder="What's on Your Mind!"
        />
        <button disabled={loading} type="submit" className={variables.addbtn}>
          Add Tsk
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddTask;
