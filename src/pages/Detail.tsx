import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, SyntheticEvent, useContext, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Label, TextInput, Button, Table } from 'flowbite-react';
import ChevronUp from '../assets/chevron-up.svg';
import AppContext from '../appContext';
import { TestSuite } from '../models/TestSuite';
import { DUMMY_TEST_PLAN, TestPlan } from '../models/TestPlan';
import PlanFormDialog from '../components/PlanFormDialog/PlanFormDialog';

type SuiteDetailPageParams = {
  suiteId: string;
};

type PlanDialogModel = {
  isVisible: boolean;
  plan?: TestPlan;
  index?: number;
};

const getDummyPlanDialogModel = () => ({
  isVisible: false,
  plan: { ...DUMMY_TEST_PLAN },
});

const Detail = () => {
  const { testSuites, setTestSuites } = useContext(AppContext);
  const params = useParams<SuiteDetailPageParams>();
  const navigate = useNavigate();
  const [planDialogModel, setPlanDialogModel] = useState<PlanDialogModel>(getDummyPlanDialogModel());

  if (!params.suiteId) {
    throw Error("Missing 'suiteId' parameter!");
  }

  const suiteId = parseInt(params.suiteId);
  const suite = suiteId && testSuites.find((suite) => suite.id === suiteId);
  if (!suite) {
    throw Error(`Invalid 'suiteId' parameter with value '${suiteId}'`);
  }

  const [model, setModel] = useState<TestSuite>(cloneDeep(suite));

  const navigateBack = () => {
    navigate('/');
  };

  const onClickBackButton = () => {
    navigateBack();
  };

  const onChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      name: event.target.value,
    });
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const nextTestSuites = testSuites.map((entry) => {
      if (entry.id === suite.id) {
        return model;
      }

      return entry;
    });

    setTestSuites(nextTestSuites);
    navigateBack();
  };

  const onClickAddPlanButton = () => {
    setPlanDialogModel({ ...getDummyPlanDialogModel(), isVisible: true });
  };

  const onClickEditPlanButton = (index: number) => {
    const plan = model.plans[index];

    setPlanDialogModel({ plan, isVisible: true, index });
  };

  const onClickRemovePlanButton = (index: number) => {
    const nextPlans = [ ...model.plans];

    nextPlans.splice(index, 1);

    setModel({ ...model, plans: nextPlans});
  };

  const onSubmitDialog = (plan: TestPlan) => {
    const { index } = planDialogModel;
    const nextPlans = [...model.plans];

    if (index === undefined) {
      nextPlans.push(plan);
    } else {
      nextPlans[index] = plan;
    }

    setModel({ ...model, plans: nextPlans });
    setPlanDialogModel({ isVisible: false })
  };

  const onCloseDialog = () => {
    setPlanDialogModel({ isVisible: false });
  }

  return (
    <div>
      <header className="text-left relative">
        <button type="button" onClick={onClickBackButton}>
          <img src={ChevronUp} className="mr-3 w-6 -rotate-90" />
        </button>

        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          Edit Test Suite (ID: {model.id})
        </div>
      </header>

      <main>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <div className="mb-2">
              <Label htmlFor="name" value="Name" />
            </div>

            <TextInput
              id="name"
              type="text"
              required={true}
              onInput={onChangeNameInput}
              value={model.name}
            />
          </div>

          <div>
            <div className="flex">
              <div className="flex-auto">Test Plans</div>
              <div className="ml-auto">
                <Button type="button" onClick={onClickAddPlanButton}>
                  Add
                </Button>
              </div>
            </div>
            <Table>
              <Table.Body>
                {model.plans.map((plan, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{plan.name}</Table.Cell>
                    <Table.Cell>{plan.browser}</Table.Cell>
                    <Table.Cell>{plan.instructionCount}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-2">
                        <Button type="button" onClick={() => onClickEditPlanButton(index)}>
                          Edit
                        </Button>
                        <Button color="failure" type="button" onClick={() => onClickRemovePlanButton(index)}>
                          Remove
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </main>

      {planDialogModel.plan && planDialogModel.isVisible && (
        <PlanFormDialog
          plan={planDialogModel.plan}
          onClose={onCloseDialog}
          onSubmit={onSubmitDialog}
        />
      )}
    </div>
  );
};

export default Detail;
