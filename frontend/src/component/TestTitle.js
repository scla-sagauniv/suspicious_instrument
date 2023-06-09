import "../css/test.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputId, setInputId] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputMethod, setInputMethod] = useState("");

  const handleIdChange = (event) => {
    setInputId(event.target.value);
  };

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setInputDescription(event.target.value);
  };

  const handleMethodChange = (event) => {
    setInputMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/task", { project_id: inputId, title: inputTitle, description: inputDescription, method: inputMethod });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={inputId} onChange={handleIdChange} />
        </div>
        <div>
        <input type="text" value={inputTitle} onChange={handleTitleChange} />
        </div>
        <div>
        <input type="text" value={inputDescription} onChange={handleDescriptionChange} />
        </div>
        <div>
        <input type="text" value={inputMethod} onChange={handleMethodChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

// function App() {
//   const [inputId, setInputId] = useState("");
//   const [inputName, setInputName] = useState("");
//   const [inputSkills, setInputSkills] = useState("");
//   const [inputMethod, setInputMethod] = useState("");

//   const handleIdChange = (event) => {
//     setInputId(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setInputName(event.target.value);
//   };

//   const handleSkillsChange = (event) => {
//     setInputSkills(event.target.value);
//   };

//   const handleMethodChange = (event) => {
//     setInputMethod(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // const response = await axios.post("/member", { project_id: inputId, name: inputName, skills: inputSkills, method: inputMethod });
//       const response = await axios.post("/project", { name: inputName, method: inputMethod });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input type="text" value={inputId} onChange={handleIdChange} />
//         </div>
//         <div>
//         <input type="text" value={inputName} onChange={handleNameChange} />
//         </div>
//         <div>
//         <input type="text" value={inputSkills} onChange={handleSkillsChange} />
//         </div>
//         <div>
//         <input type="text" value={inputMethod} onChange={handleMethodChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;