import dummydata from "../dummydata.json";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/TaskList.css";

const Task = ({ task }) => {
  return (
    <>
      <div className="taskElement">
        <p className="taskName">{task?.title}</p>
        <p className="completeTask">{task?.description}</p>
      </div>
    </>
  );
};

const TaskList = ({ pathid }) => {
  const [tasks, setTasks] = useState(null);
  const [members, setMembers] = useState(null);
  const getAllProjects = async () => {
    const pid = parseInt(pathid);
    try {
      await axios.get("/database").then((response) => {
        //表示するデータを作成
        setTasks(response.data[pid - 1].tasks);
        setMembers(response.data[pid - 1].members);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  const map_tasks_data = tasks?.map((task, index) => (
    <Task key={index} task={task} />
  ));
  return (
    <>
      <h3 className="taskListTitle">タスク一覧</h3>
      <div>{map_tasks_data}</div>
    </>
  );
};

export default TaskList;
