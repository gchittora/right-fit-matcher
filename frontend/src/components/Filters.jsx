import { useState } from 'react';
import '../styles/Filters.css';

function Filters({ onFilterChange, countries }) {
  const [filters, setFilters] = useState({
    country: 'all',
    minProbability: 0,
    sortBy: 'probability'
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="country">Country</label>
        <select 
          id="country" 
          name="country" 
          value={filters.country} 
          onChange={handleChange}
        >
          <option value="all">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minProbability">Min Admission Probability</label>
        <select 
          id="minProbability" 
          name="minProbability" 
          value={filters.minProbability} 
          onChange={handleChange}
        >
          <option value="0">All</option>
          <option value="20">20%+</option>
          <option value="30">30%+</option>
          <option value="40">40%+</option>
          <option value="50">50%+</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sortBy">Sort By</label>
        <select 
          id="sortBy" 
          name="sortBy" 
          value={filters.sortBy} 
          onChange={handleChange}
        >
          <option value="probability">Admission Probability</option>
          <option value="match_score">Match Score</option>
          <option value="ranking">University Ranking</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
