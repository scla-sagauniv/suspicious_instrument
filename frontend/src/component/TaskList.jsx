import dummydata from "../dummydata.json";
import { useEffect, useState } from "react";

const Task = ({ task }) => {
  return (
    <>
      <div className="taskElement">
        <p>{task?.title}</p>
        <p>{task?.description}</p>
      </div>
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
      <h3 className="taskListTitle">タスク一覧</h3>
      <div>{map_tasks_data}</div>
    </>
  );
};

export default TaskList;
