import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import MiniNavbar from "../components/MiniNavbar";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  return (
    <div className="home-page">
      <MiniNavbar />

      <div className="home-content">
        <h1 className="home-title">Discover Your Future, Powered by AI</h1>
        <p className="home-description">
          AI Career Advisor helps you find the perfect career by analyzing your skills, interests, and goals. 
          Explore opportunities, match your strengths, and unlock your full potential.
        </p>
        <div className="home-buttons">
          <button
            className="home-cta"
            onClick={() => navigate("/career-matcher")}
          >
            Get Started
          </button>
          <button
            className="home-secondary"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
