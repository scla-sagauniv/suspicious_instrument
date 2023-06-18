import { Link } from "react-router-dom";
const TopPage = () => {
  return (
    <>
      <h1>チャットGPTを使ったタスク管理アプリケーション</h1>
      <Link to="/projectListPage/">プロジェクト一覧</Link>
    </>
  );
};

export default TopPage;
