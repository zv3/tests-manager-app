import { API, FetchTestsSuitesAPIResponse } from './types';
import { TestSuite } from '../models/TestSuite';

const client: API = {
  async fetchTestSuites(): Promise<TestSuite[]> {
    const tests: FetchTestsSuitesAPIResponse = await fetch(import.meta.env.VITE_API_URL).then(
      (response) => response.json()
    );

    return tests.map((suite) => ({
      id: suite.id,
      name: suite.test_suite_name,
      plans: suite.test_plans.map((plan) => ({
        name: plan.test_name,
        browser: plan.browser,
        instructionCount: plan.instruction_count,
      })),
    }));
  },
};

export default client;
