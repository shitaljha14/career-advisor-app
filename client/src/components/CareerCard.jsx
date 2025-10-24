import { useState } from "react";

const CareerMatcher = () => {
  const [skillsInput, setSkillsInput] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const skillsArray = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((s) => s);

    if (skillsArray.length === 0) {
      setError("Please enter at least one skill.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skillsArray }),
      });

      if (!res.ok) throw new Error("Failed to fetch matches");

      const data = await res.json();

      // Highlight matched skills
      const highlighted = data.map((career) => {
        const matchedSkills = career.requiredSkills.filter((skill) =>
          skillsArray.includes(skill)
        );
        return { ...career, matchedSkills };
      });

      setMatches(highlighted);
    } catch (err) {
      console.error(err);
      setError("Error fetching career matches.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Career Matcher</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter your skills (comma separated)"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Matching..." : "Find Careers"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {matches.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Top Matches:</h3>
          <ul className="space-y-2">
            {matches.map((career, index) => (
              <li
                key={index}
                className="p-3 border rounded hover:bg-gray-50 transition"
              >
                <h4 className="font-bold">{career.title}</h4>
                <p>{career.description || "No description provided."}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Match Score: {career.matchScore}
                </p>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-sm ${
                        career.matchedSkills.includes(skill)
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CareerMatcher;
