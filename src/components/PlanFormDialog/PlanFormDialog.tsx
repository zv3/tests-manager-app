import { Modal, Label, TextInput, Button } from 'flowbite-react';
import { TestPlan } from '../../models/TestPlan';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

type PlanFormDialogProps = {
  plan: TestPlan;
  onClose: () => void;
  onSubmit: (plan: TestPlan) => void;
};

const PlanFormDialog = ({ plan, onClose, onSubmit }: PlanFormDialogProps) => {
  const [model, setModel] = useState<TestPlan>({ ...plan });

  const onChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({ ...model, name: event.target.value });
  };

  const onChangeBrowserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({ ...model, browser: event.target.value });
  };

  const onChangeCountInput = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({ ...model, instructionCount: parseInt(event.target.value, 10) });
  };

  const onSubmitForm = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit(model);
  };

  return (
    <div>
      <Modal show={true} onClose={onClose}>
        <Modal.Header>Edit Test Plan</Modal.Header>

        <Modal.Body>
          <form onSubmit={onSubmitForm}>
            <div>
              <div className="mb-2">
                <Label htmlFor="name" value="Name" />
              </div>

              <TextInput id="name" onChange={onChangeNameInput} value={model.name} />
            </div>

            <div>
              <div className="mb-2">
                <Label htmlFor="browser" value="Browser" />
              </div>

              <TextInput id="browser" onChange={onChangeBrowserInput} value={model.browser} />
            </div>

            <div>
              <div className="mb-2">
                <Label htmlFor="instructionCount" value="Instruction Count" />
              </div>

              <TextInput
                id="instructionCount"
                onChange={onChangeCountInput}
                value={model.instructionCount}
              />
            </div>

            <div className="mt-8 flex justify-end gap-2">
              <Button color="gray" type="button" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlanFormDialog;
