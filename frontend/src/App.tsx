import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage';
import SelectionPage from './containers/SelectionPage';
import BudgetPage from './containers/BudgetPage';
import AssignmentPage from './containers/AssignmentPage';
import ResumePage from './containers/ResumePage';
import ResumeResultPage from './containers/ResumeResultPage';

const App:React.FC = () => {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/selection" element={<SelectionPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/assignment" element={<AssignmentPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/resumeresult" element={<ResumeResultPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
