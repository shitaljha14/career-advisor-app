import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    skills: [],
    savedCareers: [],
    matchedCareers: [], // 🆕 to hold quiz results
    badges: [],
    quizHistory: [],
    progress: {}, // 🆕 { skillName: progressValue }
  });

  // Load saved user data on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user")) || {};
    setUser((prev) => ({ ...prev, ...stored }));
  }, []);

  // Save updates to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // 🆕 helper methods for reusability
  const addSkill = (skill) => {
    setUser((prev) => ({
      ...prev,
      skills: [...new Set([...prev.skills, skill])],
    }));
  };

  const saveCareer = (career) => {
    setUser((prev) => ({
      ...prev,
      savedCareers: [...new Set([...prev.savedCareers, career])],
    }));
  };

  const setMatchedCareers = (careers) => {
    setUser((prev) => ({
      ...prev,
      matchedCareers: careers,
    }));
  };

  const updateProgress = (skill, value) => {
    setUser((prev) => ({
      ...prev,
      progress: { ...prev.progress, [skill]: value },
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        addSkill,
        saveCareer,
        setMatchedCareers,
        updateProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
