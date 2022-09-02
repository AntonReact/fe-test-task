// modules
import { useCallback, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
// components
import Table from './components/table';
import Loader from './components/loader';
import ErrorMessage from './components/error-message';
import Textbox from './components/textbox';
// utils
import { parsePokemon } from './helpers/parsePokemon';
// types
import { IPokemon } from './types';

const POKES = 'pokes';

const getInitData = (): IPokemon[] => JSON.parse(localStorage.getItem(POKES) || '[]');

const COLUMNS: Array<keyof IPokemon> = ['image', 'name', 'types', 'weight'];

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const inputRef = useRef<{ clear: () => void }>(null);

  const filteredData = useMemo(() => {
    const init = getInitData();
    if (!filter && loading) setLoading(false);
    if (!filter) return init;
    return init.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, loading]);

  const isAddDisabled = Boolean(filteredData.length || loading);

  const handleSearch = useCallback((value: string) => {
    setFilter(value);
    setError('');
  }, []);

  const handleClear = useCallback(() => {
    localStorage.removeItem(POKES);
    setLoading(true);
  }, []);

  const handleAdd = useCallback((newValue: string) => {
    flushSync(() => setLoading(true));
    fetch(`https://pokeapi.co/api/v2/pokemon/${newValue}`)
    .then((res) => res.json())
    .then((data) => {
      const init = getInitData();
      const newPoke = parsePokemon(data);
      const newData = [newPoke, ...init];
      localStorage.setItem(POKES, JSON.stringify(newData));
      setFilter('');
      inputRef.current?.clear();
      setLoading(false);
    }).catch(() => {
      setError(`Pokemon "${newValue}" not found`);
      setLoading(false);
    })
  }, []);

  return (
    <div className="app">
      <ErrorMessage error={error} />
      <Loader loading={loading} />
      <Textbox ref={inputRef} onChange={handleSearch} onAdd={handleAdd} addDisabled={isAddDisabled} onClear={handleClear} />
      <Table data={filteredData} columns={COLUMNS} filter={filter} />
    </div>
  );
}

export default App;
