import "./App.css";
import { useParkingData } from "./hooks/useParkingData.tsx";
import { useState } from "react";
import Table from "./components/Table/Table.tsx";
import Filters from "./components/Filters/Filters.tsx";
import {ParkingSpaceType} from "./services/apiService.tsx";

function App() {
  const [type, setType] = useState<ParkingSpaceType | undefined>(undefined);
  const [occupation, setOccupation] = useState<boolean | undefined>();
  const { filteredSpaces, checkInOutHandler } = useParkingData(type, occupation);

  const typeFilterHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as ParkingSpaceType);
  };

  const occupationFilterHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOccupation(event.target.value === "true");
  };

  return (
    <div className={"app"}>
      <Filters
          typeFilterHandler={typeFilterHandler}
          occupationFilterHandler={occupationFilterHandler}
      />
      <Table spaces={filteredSpaces} checkInOutHandler={checkInOutHandler} />
    </div>
  );
}

export default App;
