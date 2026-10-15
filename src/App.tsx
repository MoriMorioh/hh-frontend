import { Routes, Route, Navigate } from 'react-router-dom';
import { VacanciesPage } from './pages/VacanciesPage';
import { JobPage } from './pages/JobPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/vacancies" replace />} />
      <Route path="/vacancies" element={<VacanciesPage />} />
      <Route path="/vacancies/:id" element={<JobPage />} />
      <Route path="*" element={<Navigate to="/vacancies" replace />} />
    </Routes>
  );
}

export default App;
