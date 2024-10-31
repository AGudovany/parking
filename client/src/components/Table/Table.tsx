import "./table.css";
import {ParkingSpace} from "../../services/apiService.tsx";

type TablePropsType = {
    spaces: ParkingSpace[];
    checkInOutHandler: (id: number, isOccupied: boolean) => void;
};

const Table = ({spaces, checkInOutHandler}: TablePropsType) => {

    return (
        <div className="table-container">
            <table className="responsive-table">
                <thead>
                <tr>
                    <th>Floor</th>
                    <th>Space Number</th>
                    <th>Occupation</th>
                    <th>Type</th>
                    <th>Check-in</th>
                </tr>
                </thead>
                <tbody>
                {spaces.map((space) => (
                    <tr key={space.parkingSpaceId}>
                        <td>{space.floor}</td>
                        <td>{space.parkingSpaceId}</td>
                        <td
                            className={
                                space.isOccupied ? "occupied" : "not-occupied"
                            }
                        >
                            {space.isOccupied ? "Occupied" : "Free"}
                        </td>
                        <td>{space.spaceType}</td>
                        <td>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    checkInOutHandler(space.parkingSpaceId, space.isOccupied);
                                }
                                }
                            > {space.isOccupied ? "Check-out" : "Check-In"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
