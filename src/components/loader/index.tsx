// styles
import './loader.css';

interface ILoader {
  loading?: Boolean;
}

function Loader(props: ILoader) {
  const { loading } = props;

  if (!loading && loading !== undefined) return null;
  return <div className="loader" />
}

export default Loader;