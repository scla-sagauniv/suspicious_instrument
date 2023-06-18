import { useNavigate } from "react-router-dom";
import "../css/ProjectList.css";

//for文で表示するためのコンポーネント
const Project = ({ datum }) => {
  const navigate = useNavigate();
  const handleClick = (datum) => {
    navigate(`/projectPage/${String(datum?.id)}`);
  };
  return (
    <>
      <div className="projectElement" onClick={() => handleClick(datum)}>
        <h3 className="projectTitle">{datum?.name}</h3>
        <p>タスク数：{datum?.tasks.length}</p>
        <p>メンバー数：{datum?.members.length}</p>
      </div>
    </>
  );
};

const ProjectList = ({ projects }) => {
  const map_project_data = projects?.map((datum) => (
    <Project datum={datum} key={datum.name} />
  ));
  return (
    <>
      <div>{map_project_data}</div>
    </>
  );
};

export default ProjectList;
