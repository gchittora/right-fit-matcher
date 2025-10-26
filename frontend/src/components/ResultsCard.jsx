function ResultsCard({ match, rank }) {
    const getChipColor = (probability) => {
      if (probability >= 40) return '#10b981';
      if (probability >= 25) return '#f59e0b';
      return '#ef4444';
    };
  
    return (
      <div className="match-card">
        <div className="match-rank">#{rank}</div>
        <h3>{match.name}</h3>
        <p className="country">{match.country}</p>
        
        <div className="stats">
          <div className="stat">
            <span className="label">Admission Probability</span>
            <span 
              className="value" 
              style={{ color: getChipColor(match.admission_probability) }}
            >
              {match.admission_probability}%
            </span>
          </div>
          <div className="stat">
            <span className="label">Match Score</span>
            <span className="value">{match.match_score}/100</span>
          </div>
        </div>
  
        <div className="details">
          <p><strong>Avg GMAT:</strong> {match.avg_gmat}</p>
          <p><strong>Avg GPA:</strong> {match.avg_gpa}</p>
          <p><strong>Acceptance Rate:</strong> {match.acceptance_rate}%</p>
          <p><strong>Ranking:</strong> #{match.ranking}</p>
        </div>
      </div>
    );
  }
  
  export default ResultsCard;
  