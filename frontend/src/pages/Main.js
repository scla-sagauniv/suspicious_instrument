import TestTitle from "../component/TestTitle";
import MemberModal from "../component/MemberModal";
import TaskModal from "../component/TaskModal";
import { useState } from "react";
import "../css/MemberModal.css";
import "../css/TaskModal.css";

const Main = () => {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const ShowMemberModal = () => {
    setShowMemberModal(true);
  };
  const [showTaskModal, setShowTaskModal] = useState(false);
  const ShowTaskModal = () => {
    setShowTaskModal(true);
  };
  return (
    <>
      <div>
        <MemberModal
          showFlag={showMemberModal}
          setShowMemberModal={setShowMemberModal}
        />
        <TaskModal
          showFlag={showTaskModal}
          setShowTaskModal={setShowTaskModal}
        />

        <button onClick={ShowMemberModal}>Open MemberModal</button>
        <button onClick={ShowTaskModal}>Open TaskModal</button>
      </div>
    </>
  );
};

export default Main;
