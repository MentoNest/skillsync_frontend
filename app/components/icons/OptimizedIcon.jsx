// OptimizedIcon.jsx
export default function OptimizedIcon({ path, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
}
