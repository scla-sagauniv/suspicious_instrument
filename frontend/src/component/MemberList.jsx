import { useState, useEffect } from "react";
import axios from "axios";
import "../css/MemberList.css";
const Member = ({ member }) => {
  return (
    <>
      <li>{member?.name}</li>
      <p className="skills">{member?.skills}</p>
    </>
  );
};

const MemberList = ({ pathid }) => {
  const [members, setMembers] = useState(null);
  const getAllProjects = async () => {
    const pid = parseInt(pathid);
    try {
      await axios.get("/database").then((response) => {
        //表示するデータを作成
        setMembers(response.data[pid - 1].members);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const map_members_data = members?.map((member, index) => (
    <Member key={index} member={member} />
  ));
  return (
    <>
      <div className="memberNameDiv">
        <h3 className="membersTitle">メンバー</h3>
        <ul>{map_members_data}</ul>
      </div>
    </>
  );
};

export default MemberList;
