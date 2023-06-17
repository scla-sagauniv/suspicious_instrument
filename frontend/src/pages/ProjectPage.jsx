import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "../component/TaskList";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../css/ProjectPage.css";
import MemberModal from "../component/MemberModal";
import TaskModal from "../component/TaskModal";

const ProjectPage = () => {
  const params = useParams();
  const [datum, setDatum] = useState(null);

  //member追加モーダルのstate
  const [showMemberModal, setShowMemberModal] = useState(false);
  const ShowMemberModal = () => {
    setShowMemberModal(true);
    setShowTaskModal(false);
  };

  //task追加モーダルのstate
  const [showTaskModal, setShowTaskModal] = useState(false);
  const ShowTaskModal = () => {
    setShowTaskModal(true);
    setShowMemberModal(false);
  };
  useEffect(() => {
    setDatum(params);
  }, []);

  return (
    <>
      <h1 className="ProjectPageTitle">プロジェクトページ</h1>
      <TaskList />
      <div className="taskAddButton">
        <Button
          onClick={ShowTaskModal}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          タスク追加
        </Button>
      </div>

      <div className="memberAddButton">
        <Button
          onClick={ShowMemberModal}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          メンバー追加
        </Button>
      </div>
      <MemberModal
        showFlag={showMemberModal}
        setShowMemberModal={setShowMemberModal}
      />
      <TaskModal showFlag={showTaskModal} setShowTaskModal={setShowTaskModal} />
    </>
  );
};

export default ProjectPage;
