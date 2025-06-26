import {defineStore} from "pinia";
import type {Property} from "../type/property.ts";
import {filterByParams} from "../services/search-params/search-params.ts";
import type {SearchParams} from "../services/search-params/types.ts";

export type LoadingStatus = 'non-started' | 'idle' | 'success' | 'error';

export type PropertiesStore = {
    properties : Property[] | undefined;
    loadingStatus : LoadingStatus;
    loadingError : Error | null;
    searchParams : SearchParams;
    pagesCount ?: number;
}
const usePropertiesStore = defineStore('properties',{
    state : ()=>({
        properties : undefined,
        loadingStatus : 'non-started',
        loadingError : null,
        searchParams : {
            query : undefined,
            page : 1,
            limit : 10,
        },
        pagesCount : undefined,
    } as PropertiesStore),
    actions : {
        async load(paginated:boolean=true){
            this.$patch({
                loadingStatus : 'idle',
            });
            const response = await fetch('https://orenda-iota.vercel.app/data/data.json').catch(err=>{
                this.$patch({
                    loadingStatus : 'error',
                    loadingError:err,
                });
                return err;
            });
            const data = (await response.json()) as {
                properties : Property[];
            };

            const {properties, pagesCount} = filterByParams(data.properties, this.searchParams, paginated);
            this.$patch({
                loadingStatus : 'success',
                pagesCount,
                properties,
            });

            return properties;
        },
        reset(){
            this.$patch({
                properties : undefined,
                loadingStatus : 'non-started',
                loadingError : null,
            })
        },
        updateSearchParams(updatedParams:Partial<SearchParams>){
            this.reset();
            this.$patch({
                searchParams : updatedParams,
            });
        }
    },

    getters : {
        isReadyForLoading: (state:PropertiesStore)=> state.loadingStatus == 'non-started',
    }
});

export default usePropertiesStore;