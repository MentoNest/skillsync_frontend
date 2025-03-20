import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center">
                <h1>
                    Welcome to SkillSync
                </h1>
                <p>
                    Your platform for skill-based collaboration and growth
                </p>
                <div className="flex justify-center gap-4">
                    <button>
                        Get Started
                    </button>
                    <button>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home; 