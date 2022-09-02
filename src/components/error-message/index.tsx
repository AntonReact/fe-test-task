// styles
import './error-message.css';

interface IErrorMessage {
  error?: string | null | boolean;
}

function ErrorMessage(props: IErrorMessage) {
  const { error } = props;

  if (!error) return null;

  const msg = (typeof error === "string" || Array.isArray(error)) ? error : "Error occured";

  return <div className="error-message">{msg}</div>;
}

export default ErrorMessage;