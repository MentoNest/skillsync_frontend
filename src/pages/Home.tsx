import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center">
        <h1>Welcome to SkillSync</h1>
        <p>Your platform for skill-based collaboration and growth</p>
        <div className="flex gap-4 justify-center">
          <button>Get Started</button>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
