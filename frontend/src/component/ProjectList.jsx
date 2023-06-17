import { useNavigate } from "react-router-dom";

//for文で表示するためのコンポーネント
const Project = ({ datum }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/projectPage/${String(id)}`);
  };
  return (
    <>
      <div onClick={() => handleClick(datum?.id)}>
        <p>{datum.name}</p>
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
