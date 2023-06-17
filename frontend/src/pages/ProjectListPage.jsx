import ProjectList from "../component/ProjectList";
import dummydata from "../dummydata.json";
import React, { useState, useEffect } from "react";
import db from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectModal from "../component/ProjectModal";

import "../css/ProjectListPage.css";
const ProjectListPage = () => {
  //プロジェクトを保持する変数
  const [projects, setProjects] = useState(null);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const ShowProjectModal = () => {
    setShowProjectModal(true);
  };

  const getAllProjects = async () => {
    const CollectionRef = collection(db, "Database");
    getDocs(CollectionRef).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
  };

  //初回読み込みの際にprojectにデータをセットする
  useEffect(() => {
    const CollectionRef = collection(db, "Database");

    getDocs(CollectionRef).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        console.log(doc.data());
      });
    });
  });
  return (
    <>
      <h1 className="projectPageTitle">プロジェクト一覧</h1>
      <ProjectList projects={dummydata} />
      <div className="projectAddButton">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={ShowProjectModal}
        >
          プロジェクト追加
        </Button>
      </div>
      <ProjectModal
        showFlag={showProjectModal}
        setShowProjectModal={setShowProjectModal}
      />
    </>
  );
};

export default ProjectListPage;
