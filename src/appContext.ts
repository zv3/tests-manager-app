import { createContext, Dispatch, SetStateAction } from 'react';
import { TestSuite } from './models/TestSuite';

type Context = {
  testSuites: TestSuite[];
  setTestSuites: Dispatch<SetStateAction<TestSuite[]>>;
  expandedTestSuites: Record<number, boolean>;
  setExpandedTestSuites: Dispatch<SetStateAction<Record<number, boolean>>>;
};

const defaultContext = {
  testSuites: [],
  setTestSuites: () => {},
  expandedTestSuites: {},
  setExpandedTestSuites: () => {},
};

const AppContext = createContext<Context>(defaultContext);

export default AppContext;
