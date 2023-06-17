import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "../component/TaskList";

const ProjectPage = () => {
  const params = useParams();
  const [datum, setDatum] = useState(null);
  useEffect(() => {
    setDatum(params);
  }, []);

  return (
    <>
      <h1>プロジェクトページ</h1>
      <TaskList />
    </>
  );
};

export default ProjectPage;
