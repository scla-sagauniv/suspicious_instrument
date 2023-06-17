import "../css/test.css";
import { useForm } from "react-hook-form";
import "../css/MemberModal.css";

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

  const overlay = {
    position: "fixed",
    top: "100px",
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onSubmit = (data) => {
    console.log("onSubmit data", data);
    console.log(props.todoList);
    closeModal();
  };

  return (
    <>
      {props.showFlag ? (
        <div className="container">
          <div id="overlay" style={overlay}>
            <div id="modalContent" style={modalContent}>
              <fieldset>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <label className="nameLabel" for="Name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="名前を入力してください"
                    required
                  />
                  <label className="skillLabel">Skill</label>
                  <input
                    type="text"
                    id="skill"
                    {...register("skill")}
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
