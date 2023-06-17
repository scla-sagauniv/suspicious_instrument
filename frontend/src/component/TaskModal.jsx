import "../css/test.css";
import { useForm } from "react-hook-form";
import "../css/TaskModal.css";

const TaskModal = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const closeModal = () => {
    props.setShowTaskModal(false);
  };
  const modalContent = {
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
                  <label className="TaskLabel" for="Name">
                    Task
                  </label>
                  <input
                    type="text"
                    id="task"
                    {...register("task")}
                    placeholder="タスクを入力してください"
                    required
                  />
                  <label className="contentsLabel">Contents</label>
                  <input
                    type="text"
                    id="contents"
                    {...register("contents")}
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
