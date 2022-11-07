export interface TestPlan {
  name: string;
  browser: string;
  instructionCount: number;
}

export const DUMMY_TEST_PLAN = {
  name: '',
  browser: 'edge',
  instructionCount: 1,
};
