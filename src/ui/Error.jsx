import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const { status, message, statusText } = useRouteError();
  //console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        <p>{status && statusText ? `${status} ${statusText}` : message}</p>
      </p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
