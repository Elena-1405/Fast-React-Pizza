import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const { status, message, statusText } = useRouteError();
  //console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        <p>{status && statusText ? `${status} ${statusText}` : message}</p>
      </p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
