import { Link, useNavigate } from "react-router-dom";
import "../css/TopPage.css";
import { Button } from "@mui/material";
const TopPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/projectListPage");
  };
  return (
    <main>
      {/* <div className="container"> */}
      <h3 className="subtitleTop">
        チャットGPTを使ったタスク管理アプリケーション
      </h3>
      <h1 className="titleTop">
        AI Powered <p>Task Manegement</p>
      </h1>

      <div class="LinkDiv">
        <Link to="/projectListPage/" className="LinkTop">
          プロジェクト一覧
        </Link>
      </div>
      {/* <Button onClick={handleClick} /> */}
      {/* </div> */}
    </main>
  );
};

export default TopPage;
