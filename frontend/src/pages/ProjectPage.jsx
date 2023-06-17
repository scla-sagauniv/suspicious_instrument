import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const ProjectPage = ({ state }) => {
  const params = useParams();
  const [datum, setDatum] = useState(null);
  useEffect(() => {
    setDatum(params);
  }, []);

  return (
    <>
      <h1>プロジェクトページ</h1>
      <p>{params.id}</p>
    </>
  );
};

export default ProjectPage;
