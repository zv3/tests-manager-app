import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  console.error(error);

  return <div>An unexpected error occurred.</div>;
};

export default Error;
