import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const ProjectPage = () => {
  const params = useParams();

  return (
    <>
      <h1>プロジェクトページ</h1>
      <p>{params.id}</p>
    </>
  );
};

export default ProjectPage;
