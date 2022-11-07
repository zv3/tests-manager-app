import { TestPlan } from './TestPlan';

export interface TestSuite {
  id: number;
  name: string;
  plans: TestPlan[];
}
