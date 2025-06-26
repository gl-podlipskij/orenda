import type {Property} from "../../type/property.ts";

export type QueryObject = {
    [key in string] : string;
}

export type SearchParams = {
    page : number;
    limit : number;
    query ?: string;
    city ?: string;
    region ?: string;
}

export type ParamFilterResult = {
    pagesCount : number;
    allPropertiesCount : number;
    properties : Property[];
}