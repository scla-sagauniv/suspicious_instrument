import TestTitle from "../component/TestTitle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPage from "./TopPage";
import ProjectListPage from "./ProjectListPage";
import ProjectPage from "./ProjectPage";
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/projectListPage" element={<ProjectListPage />} />
          <Route path="/projectPage/:id" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
