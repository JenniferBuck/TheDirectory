import React from 'react';
import './index.css';

const useSortedData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const EmployeeTable = (props) => {
  const { items, requestSort, sortConfig } = useSortedData(props.entries);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Employees Entries</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('income')}
              className={getClassNamesFor('income')}
            >
              Income
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('years')}
              className={getClassNamesFor('years')}
            >
              Years of Employment
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.income}</td>
            <td>{item.years}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <EmployeeTable
        entries={[
          { id: 1, name: 'Mike', income: 20000, years: 4 },
          { id: 2, name: 'Tom', income: 20000, years: 4 },
          { id: 3, name: 'Dan', income: 24000, years: 5 },
          { id: 4, name: 'Cris', income: 3500, years: 1 },
          { id: 5, name: 'Boyd', income: 10000, years: 3 },
          { id: 6, name: 'ken', income: 10000, years: 3 },
          { id: 7, name: 'Harry', income: 90000, years: 25 },
        ]}
      />
    </div>
  );
}
