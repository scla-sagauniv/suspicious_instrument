import { Link } from "react-router-dom";
const Project = ({ datum }) => {
  return (
    <>
      <p>{datum.name}</p>
      <Link to="/projectPage:id" id={datum.id}>
        プロジェクト{datum?.id}
      </Link>
    </>
  );
};

export default Project;
