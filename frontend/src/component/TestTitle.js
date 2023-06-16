import "../css/test.css";
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setInputDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/data", { name: inputName, description: inputDescription, label: "" });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputName} onChange={handleNameChange} />
        <input type="text" value={inputDescription} onChange={handleDescriptionChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;