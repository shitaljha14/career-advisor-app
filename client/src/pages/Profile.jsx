// src/pages/Profile.jsx
import { useContext, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import { UserContext } from "../components/UserContext.jsx";
import "../styles/Profile.css";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSave = () => {
    const updated = { ...user, name, email };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <MiniNavbar />
      <div className="profile-container">
        <h1 className="profile-title">Your Profile</h1>

        <div className="profile-form">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button>
        </div>

        <div className="profile-section">
          <h2>Your Skills</h2>
          {user.skills.length > 0 ? (
            <ul>
              {user.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>

        <div className="profile-section">
          <h2>Your Badges</h2>
          <div className="badge-list">
            {user.skills.length >= 3 && <span>Skill Explorer 🧠</span>}
            {user.savedCareers.length >= 2 && <span>Career Collector 💼</span>}
            {user.skills.length >= 5 && <span>Pro Learner 🚀</span>}
            {user.skills.length < 3 && user.savedCareers.length < 1 && (
              <p>No badges yet — complete some matches!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
