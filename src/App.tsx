import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import SuiteDetailPage from './routes/SuiteDetailPage';
import APIClient from './api/client';
import AppContext from './appContext';
import { TestSuite } from './models/TestSuite';
import './App.css';

function App() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [expandedTestSuites, setExpandedTestSuites] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIClient.fetchTestSuites();

      setTestSuites(data);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ testSuites, setTestSuites, expandedTestSuites, setExpandedTestSuites }}>
      <div className="App">
        <div className="container mx-w-full h-full">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/suites/:suiteId" element={<SuiteDetailPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
