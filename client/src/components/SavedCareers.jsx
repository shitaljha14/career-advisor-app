// src/components/SavedCareers.jsx
import { useContext } from "react";
import MiniNavbar from "./MiniNavbar";
import { UserContext } from "./UserContext.jsx";
import "../styles/SavedCareers.css";

const SavedCareers = () => {
  const { user, setUser } = useContext(UserContext);

  const handleRemoveCareer = (careerTitle) => {
    const updated = {
      ...user,
      savedCareers: user.savedCareers.filter((c) => c.title !== careerTitle),
    };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <div className="saved-careers-page">
      <MiniNavbar />
      <div className="saved-careers-container">
        <h1 className="saved-careers-title">Your Saved Careers</h1>

        {user.savedCareers.length > 0 ? (
          <div className="saved-careers-list">
            {user.savedCareers.map((career, idx) => (
              <div key={idx} className="saved-career-card">
                <h2>{career.title}</h2>
                <p>{career.description || "No description available."}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveCareer(career.title)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-saved">No saved careers yet. Go explore and save some!</p>
        )}
      </div>
    </div>
  );
};

export default SavedCareers;
