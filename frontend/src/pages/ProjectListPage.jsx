import ProjectList from "../component/ProjectList";
import dummydata from "../dummydata.json";
import React, { useState, useEffect } from "react";
import db from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";

import "../css/ProjectListPage.css";
const ProjectListPage = () => {
  //プロジェクトを保持する変数
  const [projects, setProjects] = useState(null);

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
      <ProjectList projects={projects} />
      <div className="projectAddButton">
        <Button variant="contained">プロジェクト追加</Button>
      </div>
    </>
  );
};

export default ProjectListPage;
