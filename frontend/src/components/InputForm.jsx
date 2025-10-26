import { useState } from 'react';
import '../styles/InputForm.css';

function InputForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    gmat_score: '',
    gpa: '',
    work_experience: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.gmat_score < 0 || formData.gmat_score > 800) {
      setError('GMAT score must be between 0 and 800');
      return;
    }

    if (formData.gpa < 0 || formData.gpa > 4.0) {
      setError('GPA must be between 0.0 and 4.0');
      return;
    }

    onSubmit({
      gmat_score: Number(formData.gmat_score),
      gpa: Number(formData.gpa),
      work_experience: Number(formData.work_experience) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="form-group">
        <label htmlFor="gmat_score">GMAT Score *</label>
        <input
          type="number"
          id="gmat_score"
          name="gmat_score"
          value={formData.gmat_score}
          onChange={handleChange}
          placeholder="200-800"
          required
          min="0"
          max="800"
        />
      </div>

      <div className="form-group">
        <label htmlFor="gpa">GPA *</label>
        <input
          type="number"
          id="gpa"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="0.0-4.0"
          step="0.01"
          required
          min="0"
          max="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="work_experience">Work Experience (years)</label>
        <input
          type="number"
          id="work_experience"
          name="work_experience"
          value={formData.work_experience}
          onChange={handleChange}
          placeholder="0-15"
          min="0"
          max="15"
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Finding Matches...' : 'Find My Matches'}
      </button>
    </form>
  );
}

export default InputForm;
