import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultsCard from './components/ResultsCard';
import LoadingSpinner from './components/LoadingSpinner';
import Filters from './components/Filters';
import { matchUniversities } from './services/api';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const handleSubmit = async (profileData) => {
    setError('');
    setLoading(true);

    try {
      const data = await matchUniversities(profileData);

      if (data.success) {
        setResults(data);
        setFilteredResults(data.matches);

        // Save to history
        const newHistory = [
          {
            profile: profileData,
            timestamp: new Date().toISOString(),
            count: data.count
          },
          ...searchHistory.slice(0, 4) // Keep last 5
        ];
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      } else {
        setError(data.message || 'Failed to fetch results');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    if (!results) return;

    let filtered = [...results.matches];

    // Filter by country
    if (filters.country !== 'all') {
      filtered = filtered.filter(m => m.country === filters.country);
    }

    // Filter by min probability
    if (filters.minProbability > 0) {
      filtered = filtered.filter(m => m.admission_probability >= Number(filters.minProbability));
    }

    // Sort
    filtered.sort((a, b) => {
      if (filters.sortBy === 'probability') {
        return b.admission_probability - a.admission_probability;
      } else if (filters.sortBy === 'match_score') {
        return b.match_score - a.match_score;
      } else {
        return a.ranking - b.ranking;
      }
    });

    setFilteredResults(filtered);
  };

  const getUniqueCountries = () => {
    if (!results) return [];
    return [...new Set(results.matches.map(m => m.country))];
  };

  return (
    <div className="app">
      <DarkModeToggle />
      <div className="container">
        <h1>MBA Right Fit Matcher</h1>
        <p className="subtitle">Find your best MBA program matches</p>

        {searchHistory.length > 0 && (
          <div className="history">
            <h3>Recent Searches</h3>
            {searchHistory.map((item, i) => (
              <div key={i} className="history-item">
                GMAT: {item.profile.gmat_score} | GPA: {item.profile.gpa} |
                Exp: {item.profile.work_experience}y → {item.count} matches
              </div>
            ))}
          </div>
        )}

        <InputForm onSubmit={handleSubmit} loading={loading} />

        {loading && <LoadingSpinner />}

        {error && <div className="error-global">{error}</div>}

        {results && (
          <div className="results">
            <Filters
              onFilterChange={handleFilterChange}
              countries={getUniqueCountries()}
            />

            <h2>Your Top Matches ({filteredResults.length} programs)</h2>
            <div className="profile-summary">
              <p>Your Profile: GMAT {results.user_profile.gmat_score} | GPA {results.user_profile.gpa} | {results.user_profile.work_experience} years experience</p>
            </div>

            <div className="results-grid">
              {filteredResults.map((match, index) => (
                <ResultsCard
                  key={match.id}
                  match={match}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
