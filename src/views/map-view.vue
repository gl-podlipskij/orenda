<script setup lang="ts">
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {computed, onMounted, onUnmounted, ref, watch, watchEffect} from "vue";
import usePropertiesStore from "../store/properties-store.ts";
import {calculateCenter, type Coordinate, parseCoordinateQuery} from "../services/map/map.ts";
import SearchCard from "../components/search/search-card.vue";
import {parseQueryObject} from "../services/search-params/search-params.ts";
import router from "../routes";
import {useRoute} from "vue-router";
import UiCard from "../components/ui/card/ui-card.vue";
import SearchIcon from "../components/icons/search-icon.vue";
import CloseIcon from "../components/icons/close-icon.vue";

const routeStore = useRoute();
const propertiesStore = usePropertiesStore();
const map = ref<maplibregl.Map>();
const markers = ref<maplibregl.Marker[]>([]);

const isSearched = ref<boolean>(false);


watchEffect(()=>{
  if (propertiesStore.isReadyForLoading) {
    propertiesStore.load(false).then();
  }
});
watchEffect( ()=>{
  parseQueryObject(routeStore.query).then(searchParams => {
    propertiesStore.updateSearchParams(searchParams);
  }).catch((error) => {
    router.back();
  })
});

onMounted(()=>{
  map.value = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    center: parseCoordinateQuery(routeStore.query) ?? [0, 0],
    zoom: 1,
  });
});
onUnmounted(()=>{
  propertiesStore.reset();
})
const properties = computed(() => {
  return propertiesStore.properties;
});
watch(properties, ()=>{
  if (
      propertiesStore.properties !== undefined
      && map.value !== undefined
  ) {
    markers.value.forEach(marker => marker.remove());
    const properties = propertiesStore.properties;
    const coordinates = properties.map(property=>property.geometry.coordinates as Coordinate);
    const center = calculateCenter(coordinates);

    map.value.setCenter(center);
    map.value.zoomTo(properties.length === 1 ? 15 : 9.5, {
        center: center,
    });

    const newMarkers:maplibregl.Marker[] = [];
    properties.forEach(property=>{
        if (map.value === undefined) return;
        const coords = property.geometry.coordinates as Coordinate;
        const preview = document.createElement("div");
        preview.style.backgroundImage = `url(http://localhost:5173/images/${property.previewImage})`;
        preview.style.backgroundSize = 'cover';

        preview.addEventListener('click', ()=>{
          router.push(`/property/${property.id}`);
        })

        map.value?.on('zoom', ev=>{
            const target = ev.target;
            const zoom = target.getZoom();

            const size = 50 * zoom / 9.5;

            preview.style.width = `${size}px`;
            preview.style.height = `${size}px`;
        });

        preview.style.width = '50px';
        preview.style.height = '50px';
        preview.style.borderRadius = '50%';
        const marker =  new maplibregl.Marker({element : preview}).
        setLngLat(coords).
        addTo(map.value);
        newMarkers.push(marker);
    });
    markers.value = newMarkers;
    return newMarkers;
  }
})

</script>

<template>
  <div class='w-full relative grow flex flex-col'>
    <ui-card size="md" class="absolute bottom-5 left-5 flex gap-2 z-3">
      <div @click="isSearched = !isSearched">
        <search-icon v-if="!isSearched"/>
        <close-icon v-if="isSearched"/>
      </div>
    </ui-card>
    <div v-if="isSearched" class="absolute z-2 container left-1/2 top-10 -translate-x-1/2">
      <SearchCard/>
    </div>
    <div id="map" class='w-full grow'>

    </div>
  </div>

</template>

<style>

</style>