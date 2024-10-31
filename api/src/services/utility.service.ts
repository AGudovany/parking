import {Injectable} from "@nestjs/common";

const typeToNameMap = {
    car: 'CAR',
    motorcycle: 'MOTOR',
    resident: 'RESIDENT',
}

@Injectable()
export class UtilityService {
    getSpaceName(type: string): string | null {
        const types = Object.values(typeToNameMap);
        const names = Object.keys(typeToNameMap);
        const index = types.indexOf(type);
        return names[index] || null;
    }

    getSpaceType(name: string): string | null {
        return typeToNameMap[name] || null;
    }
}