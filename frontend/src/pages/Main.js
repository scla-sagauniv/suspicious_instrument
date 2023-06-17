import TestTitle from "../component/TestTitle";
import Modal from "../component/Modal";
import { useState } from "react";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const ShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div>
        <Modal showFlag={showModal} setShowModal={setShowModal} />

        <button onClick={ShowModal}>Open Modal</button>
      </div>
    </>
  );
};

export default Main;
