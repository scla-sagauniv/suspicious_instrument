import "../css/test.css";
import { useForm } from "react-hook-form";
import "../css/TaskModal.css";

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

  const onSubmit = (data) => {
    console.log("onSubmit data", data);
    console.log(props.todoList);
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
                <label className="TaskLabel">Task</label>
                <input
                  type="text"
                  id="task"
                  {...register("task")}
                  placeholder="タスクを入力してください"
                  required
                  className="inputTask"
                />
                <label className="contentsLabel">Contents</label>
                <input
                  className="inputContents"
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
      ) : (
        <></>
      )}
    </>
  );
};

export default TaskModal;
