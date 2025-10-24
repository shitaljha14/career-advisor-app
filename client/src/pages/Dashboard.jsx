import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniNavbar from "../components/MiniNavbar";
import { UserContext } from "../components/UserContext.jsx";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [careers, setCareers] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("previousSearches") || "[]");
    const storedCareers = JSON.parse(localStorage.getItem("careerSuggestions") || "[]");

    setPreviousSearches(searches);
    if (storedCareers.length > 0) {
      setCareers(storedCareers);
      return;
    }

    const fetchCareers = async () => {
      if (searches.length === 0) return;
      try {
        const res = await fetch("http://localhost:5001/ai-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: searches }),
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCareers(data.careers || []);
        localStorage.setItem("careerSuggestions", JSON.stringify(data.careers || []));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCareers();
  }, []);

  const handleSaveCareer = (career) => {
    if (!user.savedCareers.find((c) => c.title === career.title)) {
      const updated = { ...user, savedCareers: [...user.savedCareers, career] };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  return (
    <div className="dashboard-page">
      <MiniNavbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome, {user.name || "Explorer"} 👋</h1>
        <p className="dashboard-description">
          Here are career suggestions based on your profile and previous searches.
        </p>

        {/* 🧠 Section 1: Skills */}
        <section className="user-skills">
          <h2>Your Skills</h2>
          {user.skills && user.skills.length > 0 ? (
            <ul>
              {user.skills.map((skill, i) => (
                <li key={i}>
                  <span>{skill}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${50 + Math.random() * 40}%`,
                        "--progress": `${50 + Math.random() * 40}%`,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No skills added yet.</p>
          )}
        </section>

        {/* 🔍 Section 2: Previous Searches */}
        <section className="previous-searches">
          <h2>Your Previous Searches</h2>
          {previousSearches.length > 0 ? (
            <ul>
              {previousSearches.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No previous searches yet.</p>
          )}
        </section>

        {/* 💼 Section 3: Career Suggestions */}
        <section className="career-suggestions">
          <h2>Career Suggestions</h2>
          {careers.length > 0 ? (
            <div className="career-list">
              {careers.map((career, idx) => (
                <div key={idx} className="career-card">
                  <h3>{career.title}</h3>
                  <p>{career.description}</p>
                  <button className="dashboard-btn" onClick={() => handleSaveCareer(career)}>
                    Save Career
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No career suggestions yet.</p>
          )}
        </section>

        {/* 📁 Section 4: Saved Careers */}
        {user.savedCareers.length > 0 && (
          <section className="saved-careers">
            <h2>Saved Careers</h2>
            <ul>
              {user.savedCareers.map((career, idx) => (
                <li key={idx}>{career.title}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 🏅 Section 5: Badges */}
        <section className="badges">
          <h2>Your Achievements</h2>
          <div className="badge-list">
            {user.skills.length >= 3 && <span className="badge">Skill Explorer 🧠</span>}
            {user.savedCareers.length >= 2 && <span className="badge">Career Collector 💼</span>}
            {user.skills.length >= 5 && <span className="badge">Pro Learner 🚀</span>}
            {user.skills.length < 3 && user.savedCareers.length < 1 && (
              <p>No badges yet — keep exploring!</p>
            )}
          </div>
        </section>

        {/* 🔘 Bottom Buttons */}
        <div className="dashboard-buttons">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/career-matcher")}
          >
            🔍 Search New Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
