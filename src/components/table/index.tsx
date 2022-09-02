// types
import { IPokemon } from "../../types";
// styles
import './table.css';

type column = keyof IPokemon;

interface ITableProps {
  data: IPokemon[];
  columns: column[];
  filter: string;
}

function Table(props: ITableProps) {
  const { data, columns, filter } = props;

  const renderColumn = (column: column) => <th key={column}>{column}</th>

  const renderContent = (column: column, data: IPokemon) => {
    switch (column) {
      case "types": return (
        <div className="types">
          {data.types.map((i: string) => <div key={i}>{i}</div>)}
        </div>
      );
      case "image": return (
        <img src={data.image} alt={data.name} />
      )
      default: return data[column];
    }
  }

  const renderCell = (poke: IPokemon) => (column: column) => {
    return (
      <td key={column}>{renderContent(column, poke)}</td>
    )
  }

  const renderRow = (poke: IPokemon) => (
    <tr key={poke.name}>
      {columns.map(renderCell(poke))}
    </tr>
  );

  const renderEmpty = () => {
    if (data.length) return null;
    if (filter) return (
      <div className="no-data">
        <div>{`No pokemons with name "${filter}" found`}</div>
      </div>
    )
    return (
      <div className="no-data">
        <div>You have no pokemons added.</div>
        <div>Go add one!</div>
      </div>
    )
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(renderColumn)}
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
      {renderEmpty()}
    </>
  )
}

export default Table;