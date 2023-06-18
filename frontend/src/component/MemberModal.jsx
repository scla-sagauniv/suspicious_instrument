import "../css/test.css";
import { useForm } from "react-hook-form";
import "../css/MemberModal.css";
import axios from "axios";
import { useState, useEffect } from "react";

const MemberModal = (props) => {
  const { register, handleSubmit, reset } = useForm();

  const closeModal = () => {
    props.setShowMemberModal(false);
  };
  const modalContent = {
    background: "white",
    padding: "10px",
    borderRadius: "3px",
  };

  const onSubmit = async (data) => {
    // console.log(props.todoList);
    try {
      await axios.post("/member", data);
      console.log("onSubmit data", data);
      console.log(props.project_id);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    } finally {
      console.log(data);
    }
    reset();
    closeModal();
  };

  return (
    <>
      {props.showFlag ? (
        <div className="container">
          <div id="modalContent" style={modalContent}>
            <fieldset>
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <input
                  type="hidden"
                  id="method"
                  value={"add"}
                  {...register("method")}
                  required
                />
                <input
                  type="hidden"
                  id="project_id"
                  value={parseInt(props?.project_id)}
                  {...register("project_id")}
                  required
                />
                <label className="nameLabel" for="Name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="名前を入力してください"
                  required
                  className="inputName"
                />
                <label className="skillLabel">Skill</label>
                <input
                  className="inputSkills"
                  type="text"
                  id="skills"
                  {...register("skills")}
                  placeholder="スキルを入力してください"
                  required
                />
                <input
                  id="submit_btn"
                  type="submit"
                  value="送信"
                  className="submit-button"
                />
              </form>
            </fieldset>
            <div onClick={closeModal}>
              <span className="batsu"></span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MemberModal;
