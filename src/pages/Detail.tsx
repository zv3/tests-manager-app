import {useNavigate, useParams} from 'react-router-dom';
import {ChangeEvent, SyntheticEvent, useContext, useState} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Label, TextInput, Button } from 'flowbite-react'
import ChevronUp from '../assets/chevron-up.svg';
import AppContext from '../appContext';
import {TestSuite} from "../models/TestSuite";

type SuiteDetailPageParams = {
  suiteId: string;
};

const Detail = () => {
  const { testSuites, setTestSuites } = useContext(AppContext);
  const params = useParams<SuiteDetailPageParams>();
  const navigate = useNavigate();

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
  }

  const onClickBackButton = () => {
    navigateBack()
  }

  const onChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setModel({
      ...model,
      name: event.target.value
    });
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const nextTestSuites = testSuites.map(entry => {
      if (entry.id === suite.id) {
        return model;
      }

      return entry;
    });

    setTestSuites(nextTestSuites);
    navigateBack();
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

            <TextInput id="name" type="text" required={true} onInput={onChangeNameInput} value={model.name} />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </main>
    </div>
  );
};

export default Detail;
