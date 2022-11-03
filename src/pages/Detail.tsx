import {useNavigate, useParams} from 'react-router-dom';
import { useContext } from 'react';
import ChevronUp from '../assets/chevron-up.svg';
import AppContext from '../appContext';

type SuiteDetailPageParams = {
  suiteId: string;
};

const Detail = () => {
  const context = useContext(AppContext);
  const params = useParams<SuiteDetailPageParams>();
  const navigate = useNavigate();

  if (!params.suiteId) {
    throw Error("Missing 'suiteId' parameter!");
  }

  const suiteId = parseInt(params.suiteId);
  const suite = suiteId && context.testSuites.find((suite) => suite.id === suiteId);
  if (!suite) {
    throw Error(`Invalid 'suiteId' parameter with value '${suiteId}'`);
  }

  const onClickBackButton = () => {
    navigate('/');
  }

  return (
    <div>
      <header className="text-left relative">
          <button type="button" onClick={onClickBackButton}>
            <img src={ChevronUp} className="mr-3 w-6 -rotate-90" />
          </button>

        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          {suite.name}
        </div>
      </header>
    </div>
  );
};

export default Detail;
