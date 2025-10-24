import React from "react";
import MiniNavbar from "../components/MiniNavbar";
import "../styles/About.css";

const About = () => {
  return (
<div className="about-page">
  <MiniNavbar />

  <div className="about-content">
    <h1 className="about-title">About AI Career Advisor</h1>
    <p className="about-description">
      Our mission is to empower students and professionals with personalized career guidance using advanced AI. 
      We combine data-driven insights with expert advice to help you make informed decisions.
    </p>

    <div className="about-sections">
      <h2>Our Mission</h2>
      <p>We aim to remove uncertainty and provide clarity in career choices, helping you choose the right path with confidence.</p>

      <h2>Our Approach</h2>
      <p>By analyzing your skills, experience, and interests, we recommend career paths tailored specifically for you.</p>

      <h2>Why Choose Us?</h2>
      <ul>
        <li>Personalized AI guidance</li>
        <li>Data-backed recommendations</li>
        <li>Easy-to-use and actionable insights</li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default About;
