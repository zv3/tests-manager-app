import { TestSuite } from '../models/TestSuite';

export type FetchTestsSuitesAPIResponse = Array<{
  id: number;
  test_suite_name: string;
  test_plans: Array<{
    test_name: string;
    browser: string;
    instruction_count: number;
  }>;
}>;

export interface API {
  fetchTestSuites(): Promise<TestSuite[]>;
}
