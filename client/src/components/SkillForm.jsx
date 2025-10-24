import { useContext, useState } from "react";
import MiniNavbar from "./MiniNavbar";
import { UserContext } from "../context/UserContext";
import "../styles/SkillForm.css";

const SkillForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    setUser({ ...user, skills: [...user.skills, skillInput.trim()] });
    setSkillInput("");
  };

  return (
    <div className="skill-form-page">
      <MiniNavbar />
      <div className="skill-form-container">
        <h1>Add Your Skills</h1>
        <input
          type="text"
          placeholder="Enter skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button onClick={handleAddSkill}>Add Skill</button>

        <h2>Your Skills:</h2>
        <ul>
          {user.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillForm;
