import { useForm } from "react-hook-form";
import "../css/ProjectModal.css";
import axios from "axios";

const ProjectModal = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const closeModal = () => {
    props.setShowProjectModal(false);
  };
  const modalContent = {
    background: "white",
    padding: "10px",
    borderRadius: "3px",
    position: "relative",
  };

  //   const overlay = {
  //     position: "fixed",
  //     top: "100px",
  //     left: 0,
  //     width: "100%",
  //     height: "100%",
  //     backgroundColor: "rgba(0,0,0,0.5)",

  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   };

  const onSubmit = async (data) => {
    try {
      await axios.post("/project", data);
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
    window.location.reload();
  };

  return (
    <>
      {props.showFlag ? (
        <div className="container">
          <div id="overlay">
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

                  <input
                    id="submit_btn"
                    type="submit"
                    value="送信"
                    className="submit-button"
                  />
                </form>
              </fieldset>
              <div onClick={closeModal}>
                <span className="batsuProject"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProjectModal;
