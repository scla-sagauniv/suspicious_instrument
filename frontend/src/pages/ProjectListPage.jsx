import ProjectList from "../component/ProjectList";
import dummydata from "../dummydata.json";
import React, { useState, useEffect } from "react";
import db from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import "../css/ProjectListPage.css";
const ProjectListPage = () => {
  //プロジェクトを保持する変数
  const [projects, setProjects] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);

  const getAllProjects = async () => {
    try {
      await axios.get("/database").then((response) => {
        //表示するデータを作成
        setProjects(response.data);
        setProjectsCount(response.data.length);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //初回読み込みの際にprojectにデータをセットする
  useEffect(() => {
    getAllProjects();
  });
  return (
    <>
      <h1 className="projectPageTitle">プロジェクト一覧</h1>
      <ProjectList projects={projects} />
      <div className="projectAddButton">
        <Button variant="outlined" startIcon={<AddIcon />}>
          プロジェクト追加
        </Button>
      </div>
    </>
  );
};

export default ProjectListPage;
