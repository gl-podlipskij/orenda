import {defineStore} from "pinia";
import type {LoadingStatus} from "./properties-store.ts";
import type {Property} from "../type/property.ts";

export const PARAMS_ID = 'id';
export type PropertyState = {
    loadingStatus : LoadingStatus;
    loadingError : Error | null;
    property ?: Property;

}
const usePropertyStore = defineStore('property', {
    state : ()=>({
        loadingStatus : 'non-started',
        loadingError : null,
        property : undefined,
    } as PropertyState),
    actions : {
        async load(id:string){
            this.$patch({
                loadingStatus : 'idle',
                loadingError : null,
            });
            const res = await fetch(`http://localhost:5173/data/data.json`);
            const properties = (await res.json() as {properties:Property[]}).properties;

            const property = properties.find(p => {
                return p.id === id;
            });

            if (property === undefined) {
                const error = new Error(`Property ${id} not found.`)
                this.$patch({
                    loadingError : error,
                    loadingStatus : 'error',
                });
                return error;
            }
            this.$patch({
                loadingStatus : 'success',
                property : property,
            })
            return property;
        },
        reset(){
            this.$patch({
                loadingStatus : 'non-started',
                loadingError : null,
                property : undefined,
            })
        }
    },

    getters : {
        isReadyForLoading : (state)=>{
            return state.loadingStatus === 'non-started';
        }
    }
});
export default usePropertyStore;