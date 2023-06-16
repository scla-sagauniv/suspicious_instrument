import ProjectList from "../component/ProjectList";
import dummydata from "../dummydata.json";
import React, { useState, useEffect } from "react";

const ProjectListPage = () => {
  //プロジェクトを保持する変数
  const [projects, setProjects] = useState(null);

  //初回読み込みの際にprojectにデータをセットする
  useEffect(() => {
    setProjects(dummydata);
  });
  return (
    <>
      <ProjectList projects={projects} />
    </>
  );
};

export default ProjectListPage;
