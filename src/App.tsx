import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Detail from './pages/Detail';
import APIClient from './api/client';
import AppContext from './appContext';
import { TestSuite } from './models/TestSuite';
import Error from './pages/Error';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route path="/suites/:suiteId" element={<Detail />} />
    </Route>
  )
);

function App() {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTestSuites, setExpandedTestSuites] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIClient.fetchTestSuites();

      setIsLoading(false);
      setTestSuites(data);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2500} />
      <AppContext.Provider
        value={{ testSuites, setTestSuites, expandedTestSuites, setExpandedTestSuites }}
      >
        <div className="App">
          <div className="container mx-w-full h-full m-auto">
            <RouterProvider router={router} />
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
