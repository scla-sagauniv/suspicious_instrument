import ProjectList from "../component/ProjectList";
import dummydata from "../dummydata.json";

const ProjectListPage = () => {
  return (
    <>
      <ProjectList projects={dummydata} />
    </>
  );
};

export default ProjectListPage;
