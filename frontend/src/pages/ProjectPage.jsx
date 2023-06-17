import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "../component/TaskList";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../css/ProjectPage.css";

const ProjectPage = () => {
  const params = useParams();
  const [datum, setDatum] = useState(null);
  useEffect(() => {
    setDatum(params);
  }, []);

  return (
    <>
      <h1 className="ProjectPageTitle">プロジェクトページ</h1>
      <TaskList />
      <div className="taskAddButton">
        <Button variant="outlined" startIcon={<AddIcon />}>
          タスク追加
        </Button>
      </div>

      <div className="memberAddButton">
        <Button variant="outlined" startIcon={<AddIcon />}>
          メンバー追加
        </Button>
      </div>
    </>
  );
};

export default ProjectPage;
