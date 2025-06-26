import type {LocationQuery} from "vue-router";

export type Coordinate = [number, number];

export const COORDINATES_QUERY = 'coordinate';
export function calculateCenter(coordinates:Coordinate[]) {
    return coordinates.reduce((prev, coordinate) => {
        return prev.map((x, i) => {
            return x + coordinate[i];
        }) as Coordinate;
    }).map(x => x / coordinates.length) as Coordinate;
}
export function generateCoordinateQuery(coordinate:Coordinate) {
    return `/map/?${COORDINATES_QUERY}=${coordinate[0]},${coordinate[1]}`;
}
export function parseCoordinateQuery(query:LocationQuery){
    const coordsQuery = query[COORDINATES_QUERY] as (string | undefined);
    if (coordsQuery) {
        const coords = coordsQuery.split(',').map(str => Number(str).valueOf());
        return coords as Coordinate;
    }
    return undefined;
}