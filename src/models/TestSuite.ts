export interface TestPlan {
  name: string;
  browser: string;
  instructionCount: number;
}

export interface TestSuite {
  id: number;
  name: string;
  plans: TestPlan[];
}
