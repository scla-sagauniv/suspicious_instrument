import Project from "./Project";

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
