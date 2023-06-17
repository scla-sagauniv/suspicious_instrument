import dummydata from "../dummydata.json";
import { useEffect, useState } from "react";

const Task = ({ task }) => {
  return (
    <>
      <p>{task?.title}</p>
      <p>{task?.description}</p>
    </>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    console.log(dummydata[0].tasks);
    setTasks(dummydata[0].tasks);
  });

  const map_tasks_data = tasks?.map((task) => (
    <Task task={task} key={task.id} />
  ));
  return (
    <>
      <h1>タスク一覧</h1>
      <div>{map_tasks_data}</div>
    </>
  );
};

export default TaskList;
