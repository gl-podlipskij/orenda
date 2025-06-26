import {defineStore} from "pinia";
import type {LoadingStatus} from "./properties-store.ts";

export type LocationStoreState = {
    loadingStatus : LoadingStatus;
    data ?: Record<string, string[]>;
}
const useLocationStore = defineStore('location',{
    state : ()=>({
        loadingStatus : 'non-started',
        data : undefined,
    } as LocationStoreState),
    actions : {
        async load(){
            this.$patch({
                loadingStatus : 'idle',
            });
            const res = await fetch('/data/location.json').catch(err=>{
                this.$patch({
                    loadingStatus : 'error',
                });
                throw err;
            });
            const data = await res.json() as Record<string, string[]>;
            this.$patch({
                data : data,
            });

            return data;
        },
        getAllRegions(city:string) {
            return this.data?.[city];
        }
    },
    getters : {
        getAllCities : (state)=>{
            return state.data ? Object.keys(state.data) : undefined;
        },

    }

});


export default useLocationStore;