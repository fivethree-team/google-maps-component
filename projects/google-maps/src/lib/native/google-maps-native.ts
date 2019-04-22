import { IFivGoogleMaps, LatLng } from './../google-maps';
import { Component, OnInit, Input } from '@angular/core';
import {
    GoogleMap,
    GoogleMaps,
    GoogleMapOptions,
    GoogleMapsEvent,
    Marker,
    MyLocation,
    MarkerOptions,
    MapType,
    ILatLng
} from '@ionic-native/google-maps';

@Component({
    selector: 'fiv-google-maps-native',
    templateUrl: './google-maps-native.html',
    styleUrls: ['google-maps-native.scss'],
})
export class FivGoogleMapsNative implements OnInit, IFivGoogleMaps {

    @Input() zoom = 14;
    @Input() zoomToLocationOnMapReady = true;
    @Input() mapOptions: GoogleMapOptions;
    @Input() mapType: MapType | string;

    map: GoogleMap;
    markers: Marker[] = [];
    mapReady = false;

    constructor() { }

    ngOnInit() {
        this.loadMap();
    }

    private loadMap(): any {
        this.map = GoogleMaps.create('map', {
            mapType: this.mapType,
            controls: {
                myLocation: true,
                myLocationButton: false,
                mapToolbar: false,
                compass: true,
            }
        });
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            this.mapReady = true;
            if (this.zoomToLocationOnMapReady) {
                this.zoomToMyLocation(this.zoom);
            }
        });
    }

    async zoomToMyLocation(zoom: number) {
        try {
            const location: MyLocation = await this.getCurrentPosition();
            this.moveCenterToWithAnimation(zoom, location.latLng);
        } catch (error) {
            // TODO add output
        }
    }

    getCurrentPosition(): Promise<MyLocation> {
        return this.map.getMyLocation({ enableHighAccuracy: true });
    }

    changeMapType(mapTypeId: MapType) {
        this.map.setMapTypeId(mapTypeId);
    }

    moveCenterToWithAnimation(zoom: number, latLng: ILatLng) {
        this.map.animateCamera({ zoom, target: latLng, duration: 350 });
    }

    moveCenterTo(zoom: number, latLng: ILatLng) {
        this.map.moveCamera({ zoom, target: latLng, duration: 350 });
    }

    async centerCurrentPositionAndMarkers() {
        try {
            const location: MyLocation = await this.getCurrentPosition();

            const positions: ILatLng[] =
                [location.latLng,
                ...this.markers.map(marker => marker.getPosition())];
            this.moveCenterToPositions(positions);
        } catch (error) {
        }
    }

    moveCenterToPositions(positions: ILatLng[]) {
        this.map.animateCamera({
            target: positions,
            duration: 500
        });
    }

    async addMarkerAtCurrentPosition(options?: MarkerOptions) {
        if (!options) {
            options = { position: null };
        }
        const location: MyLocation = await this.getCurrentPosition();
        options.position = location.latLng;
        this.addMarkerWithOptions(options);
    }

    centerAllMarker(bounds: ILatLng[]) {
        this.map.moveCamera({
            target: bounds
        });
    }


    addMarker(lat: number, lng: number) {
        const marker = this.map.addMarkerSync({
            animation: 'DROP',
            position: {
                lat,
                lng
            }
        });
        this.markers.push(marker);
    }

    addMarkerWithOptions(options: MarkerOptions) {
        const marker = this.map.addMarkerSync(options);
        this.markers.push(marker);
    }

    hideMarkers() {
        this.markers.forEach(marker => marker.setVisible(false));
    }

    showMarkers() {
        this.markers.forEach(marker => marker.setVisible(true));
    }

    deleteMarker(position: LatLng) {
        const markerIndex = this.markers.findIndex(marker => {
            const markerPosition = marker.getPosition();
            return markerPosition.lat === position.lat
                && markerPosition.lng === position.lng;
        });
        if (markerIndex > -1) {
            this.markers[markerIndex].remove();
            this.markers.splice(markerIndex, 1);
        }
    }

    deleteMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }
}
