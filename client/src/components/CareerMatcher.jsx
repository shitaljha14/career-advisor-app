import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniNavbar from "../components/MiniNavbar";
import { UserContext } from "/Users/shitalkumari/career-recommendation-system/client/src/components/UserContext.jsx"; // 🔹 Add this
import "../styles/CareerMatcher.css";

const CareerMatcher = () => {
  const { user, setUser } = useContext(UserContext); // 🔹 Add this
  const [skillsInput, setSkillsInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMatches([]);
  
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  
    if (skillsArray.length === 0) {
      setError("Please enter at least one skill.");
      setLoading(false);
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5001/ai-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsArray }),
      });
  
      if (!res.ok) throw new Error("Failed to fetch AI matches");
      const data = await res.json();
      const matchedCareers = data.careers || data;
  
      // ✅ Save both skills & matched careers to localStorage
      localStorage.setItem("previousSearches", JSON.stringify(skillsArray));
      localStorage.setItem("careerSuggestions", JSON.stringify(matchedCareers));
  
      // ✅ Update user context
      setUser({
        ...user,
        skills: [...new Set([...user.skills, ...skillsArray])],
      });
  
      setMatches(matchedCareers);
     navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Error fetching AI career matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="career-page">
      <MiniNavbar />
      <div className="career-container">
        <h1 className="career-title">Career Matcher</h1>
        <p className="career-description">
          Enter your skills to get AI-powered career suggestions.
        </p>

        <form onSubmit={handleSubmit} className="career-form">
          <input
            type="text"
            placeholder="Enter your skills (comma separated)"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
          />
          <button type="submit">{loading ? "Matching..." : "Find Careers"}</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {matches.length > 0 && (
          <div className="matches-container">
            {matches.map((career, index) => (
              <div key={index} className="career-card">
                <h3>{career.title}</h3>
                <p>{career.description || "No description available."}</p>
                {career.requiredSkills?.length > 0 && (
                  <p><strong>Skills:</strong> {career.requiredSkills.join(", ")}</p>
                )}
                {career.averageSalary && (
                  <p><strong>Avg Salary:</strong> {career.averageSalary}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerMatcher;