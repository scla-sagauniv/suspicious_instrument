import { Link } from "react-router-dom";

//for文で表示するためのコンポーネント
const Project = ({ datum }) => {
  return (
    <>
      <p>{datum.name}</p>
      <Link to="/projectPage" id={datum.id}>
        プロジェクト{datum?.id}
      </Link>
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
