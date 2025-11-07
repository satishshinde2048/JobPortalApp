import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobDetails from './components/JobDetails';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import ApplicationSummary from './components/ApplicationSummary';
import Profile from './components/Profile';

const App = () => {
  return (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/apply/:id" element={<ApplicationForm />} />
            <Route path="/applications" element={<ApplicationList />} />
            <Route path="/applications/:id" element={<ApplicationSummary />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
  );
};

export default App;
