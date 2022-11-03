import { Link } from 'react-router-dom';
import { TestPlan, TestSuite } from '../models/TestSuite';
import { useContext } from 'react';
import ChevronUp from '../assets/chevron-up.svg';
import AppContext from '../appContext';

type PlanRowProps = {
  plan: TestPlan;
};

const PlanRow = ({ plan }: PlanRowProps) => {
  return (
    <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
      >
        {plan.name}
      </th>
      <td className="px-6 py-4 text-xs">{plan.browser}</td>
      <td className="px-6 py-4 text-xs">{plan.instructionCount} steps</td>
    </tr>
  );
};

type SuitePlansProps = {
  plans: TestPlan[];
};

const SuitePlans = ({ plans }: SuitePlansProps) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-9">
        <tbody>
          {plans.map((plan) => (
            <PlanRow plan={plan} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

type SuiteRowProps = {
  suite: TestSuite;
  expanded: boolean;
};

const SuiteRow = ({ suite, expanded }: SuiteRowProps) => {
  const context = useContext(AppContext);

  const onClickDetailToggle = () => {
    context.setExpandedTestSuites((currentValue) => ({
      ...currentValue,
      [suite.id]: !currentValue[suite.id],
    }));
  }

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left flex items-center flex-row"
        >
          {suite.plans.length && <button type="button" onClick={onClickDetailToggle}>
            <img src={ChevronUp} className={`mr-3 w-3 h-3 ${!expanded ? 'rotate-180' : ''}`} />
          </button>}
          {suite.name}
        </th>
        <td className="px-6 py-4 text-xs">{suite.plans.length} tests</td>
        <td className="w-16 text-center">
          <Link to={`/suites/${suite.id}`}>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Edit
            </button>
          </Link>
        </td>
      </tr>
      {expanded && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6">
        <td colSpan={3}>
          <SuitePlans plans={suite.plans} />
        </td>
      </tr>}
    </>
  );
};

const HomePage = () => {
  const context = useContext(AppContext);
  const isExpanded = (id: number) => context.expandedTestSuites[id];

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {context.testSuites.map((suite) => (
            <SuiteRow suite={suite} expanded={isExpanded(suite.id)}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
