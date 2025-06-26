import type {Property} from "../../type/property.ts";
import type {ParamFilterResult, SearchParams} from "./types.ts";
import createSearchParamsScheme from "./scheme.ts";
import {CITY_QUERY, PAGE_QUERY, REGION_QUERY, SEARCH_QUERY} from "./constant.ts";
import type {LocationQuery} from "vue-router";
import type {ValidationError} from "yup";

function filterByQuery(query:string){
    return ((item:Property) => {
        return item.name.includes(query);
    })
}
function filterByCity( city:string) {
    return ((item:Property) => {
        const itemCity = item.location.split(',')[0];
        return itemCity === city;
    })
}
export function filterByRegion(region:string) {
    return ((item:Property) => {
        const itemRegion = item.location.split(',')[1].trim();
        return itemRegion === region;
    })
}
export function selectAll() {

    return true;
}
export function filterByParams(properties:Property[], params:SearchParams, pagination:boolean=true):ParamFilterResult{
    const {query, region, city} = params;

    const filtered = properties.
    filter(query !== undefined ? filterByQuery(query) : selectAll).
    filter(city !== undefined ? filterByCity(city) : selectAll).
    filter(region !== undefined ? filterByRegion(region) : selectAll);
    debugger;


    const allPropertiesCount = filtered.length;
    const pagesCount = Math.ceil(allPropertiesCount / params.limit);

    const result = pagination ? filtered.slice((params.page - 1) * params.limit, params.page * params.limit) : filtered;



    return {
        allPropertiesCount,
        pagesCount,
        properties : result,
    };
}
export async function parseQueryObject(queryObject:LocationQuery, limit:number=10) {

    const searchQuery = queryObject[SEARCH_QUERY] as (string | undefined);
    const city = queryObject[CITY_QUERY] as (string | undefined);
    const region = queryObject[REGION_QUERY] as (string | undefined);


    const searchParams = {
        page : (queryObject[PAGE_QUERY]) ? Number(queryObject[PAGE_QUERY]) : undefined,
        query : searchQuery ? decodeURI(searchQuery) : undefined,
        city : city ? decodeURI(city) : undefined,
        region : region ? decodeURI(region) : undefined,
    }

    const scheme = createSearchParamsScheme();
    const result = await scheme.validate(searchParams).catch((err:ValidationError)=>{
        return err;
    });
    if (result instanceof Error) {
        throw result;
    }

    return  {
        query : result.query,
        page : result.page ?? 1,
        limit : limit,
        city : result.city,
        region : result.region,
    } as SearchParams;
}