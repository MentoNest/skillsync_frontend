import React from "react";
import "./LearningTrackCard.css";

const LearningTrackCard = ({
  image,
  category,
  title,
  description,
  lessonCount,
  duration,
  onStart,
}) => {
  return (
    <div className="track-card">
      <div className="track-image-wrapper">
        <img src={image} alt={title} className="track-image" />
        <span className="track-category">{category}</span>
      </div>

      <div className="track-content">
        <h3 className="track-title">{title}</h3>
        <p className="track-description">{description}</p>

        <div className="track-meta">
          <span>{lessonCount} Lessons</span>
          <span>{duration}</span>
        </div>

        <button className="track-button" onClick={onStart}>
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default LearningTrackCard;