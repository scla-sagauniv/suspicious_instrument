import { useNavigate } from "react-router-dom";
import "../css/ProjectList.css";

//for文で表示するためのコンポーネント
const Project = ({ datum }) => {
  const navigate = useNavigate();
  const handleClick = (datum) => {
    console.log(datum);
    navigate(`/projectPage/${String(datum?.id)}`);
  };
  return (
    <>
      <div className="projectElement" onClick={() => handleClick(datum)}>
        <h3>{datum?.name}</h3>
        <p>タスク数：{datum?.tasks.length}</p>
        <p>メンバー数：{datum?.members.length}</p>
      </div>
    </>
  );
};

const ProjectList = ({ projects }) => {
  const map_project_data = projects?.map((datum) => (
    <Project datum={datum} key={datum.id} />
  ));
  return (
    <>
      <h1>プロジェクト一覧</h1>
      <div>{map_project_data}</div>
    </>
  );
};

export default ProjectList;
