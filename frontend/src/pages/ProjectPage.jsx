import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskList from "../component/TaskList";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../css/ProjectPage.css";
import MemberModal from "../component/MemberModal";
import TaskModal from "../component/TaskModal";
import { useLocation } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import MemberList from "../component/MemberList";

const ProjectPage = () => {
  const pathid = parseInt(useLocation().pathname.slice(-1));
  const [projectId, setProjectId] = useState(-1);

  //member追加モーダルのstate
  const [showMemberModal, setShowMemberModal] = useState(false);
  const ShowMemberModal = () => {
    setShowMemberModal(true);
    setShowTaskModal(false);
  };

  //task追加モーダルのstate
  const [showTaskModal, setShowTaskModal] = useState(false);
  const ShowTaskModal = () => {
    console.log(pathid);
    setShowTaskModal(true);
    setShowMemberModal(false);
  };

  return (
    <>
      <h1 className="ProjectPageTitle">プロジェクトページ</h1>
      <TaskList pathid={pathid} />
      <MemberList className="memberListDiv" pathid={pathid} />
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
        project_id={pathid}
        showFlag={showMemberModal}
        setShowMemberModal={setShowMemberModal}
      />
      <TaskModal
        project_id={pathid}
        showFlag={showTaskModal}
        setShowTaskModal={setShowTaskModal}
      />
    </>
  );
};

export default ProjectPage;
