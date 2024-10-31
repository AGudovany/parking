import "./filters.css";

type FiltersType = {
  typeFilterHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  occupationFilterHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Filters = ({
  typeFilterHandler,
  occupationFilterHandler,
}: FiltersType) => {
  const types = ['car', 'motorcycle', 'resident'];
  return (
    <header className={"header"}>
      <div className="filters">
        <h3>Parking spaces</h3>
        <label htmlFor="typeFilter">Filter by type:</label>
        <select id="typeFilter" onChange={typeFilterHandler}>
          <option value="">All Types</option>
          {types.map((type, index) => {
            return (
                <option key={index} value={type}>
                  {type}
                </option>
            );
          })}
        </select>

        <label htmlFor="occupationFilter">Filter by occupation:</label>
        <select id="occupationFilter" onChange={occupationFilterHandler}>
          <option value="">All spaces</option>
          <option value={'false'}>
            Free
          </option>
          <option value={'true'}>
            Occupied
          </option>
        </select>
      </div>
    </header>
  );
};

export default Filters;
