import { Link } from "react-router-dom";
import "../css/TopPage.css";
const TopPage = () => {
  return (
    <main>
      {/* <div className="container"> */}
      <h3 className="subtitleTop">
        チャットGPTを使ったタスク管理アプリケーション
      </h3>
      <h1 className="titleTop">
        AI Powerd <p>Task Manegement</p>
      </h1>

      <div class="LinkDiv">
        <Link to="/projectListPage/" className="LinkTop">
          プロジェクト一覧
        </Link>
      </div>
      {/* </div> */}
    </main>
  );
};

export default TopPage;
