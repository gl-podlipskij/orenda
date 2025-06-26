export type Property = {
    id: string;
    name: string;
    description: string;
    price: number;
    geometry: GeoJSON.Point,
    location : `${string},${string}`;
    //geometry: GeoJSON.Point;
    previewImage: string;
}