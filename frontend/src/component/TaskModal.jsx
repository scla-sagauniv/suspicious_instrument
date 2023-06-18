import "../css/test.css";
import { useForm } from "react-hook-form";
import "../css/TaskModal.css";
import axios from "axios";

const TaskModal = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const closeModal = () => {
    props.setShowTaskModal(false);
  };
  const modalContent = {
    background: "white",
    padding: "10px",
    borderRadius: "3px",
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("/task", data);
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
                <label className="TaskLabel">Task</label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  placeholder="タスクを入力してください"
                  required
                  className="inputTask"
                />
                <label className="contentsLabel">Description</label>
                <input
                  className="inputContents"
                  type="text"
                  id="contents"
                  {...register("description")}
                  placeholder="内容を入力してください"
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

export default TaskModal;
