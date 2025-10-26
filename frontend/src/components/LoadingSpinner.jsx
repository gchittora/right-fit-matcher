import '../styles/LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Finding your best matches...</p>
    </div>
  );
}

export default LoadingSpinner;
