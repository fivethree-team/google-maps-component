import { IFivGoogleMaps, LatLng } from '../google-maps';
import { Component, OnInit, ElementRef, Renderer2, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'fiv-google-maps-web',
    template: ``,
    styleUrls: ['google-maps-web.scss'],
})
export class FivGoogleMapsWeb implements OnInit, IFivGoogleMaps {

    @Input() apiKey: string;
    @Input() zoom = 15;
    @Input() mapOptions: google.maps.MapOptions; // TODO enable mapoptions

    public lat = 50.9576191;
    public lng = 6.8272408;
    public map: google.maps.Map;
    public markers: google.maps.Marker[] = [];
    private mapsLoaded = false;

    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        @Inject(DOCUMENT) private _document) {
    }

    ngOnInit() {
        this.init().then((res) => {
        }, (err) => {
        });
    }

    private init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                this.initMap().then(() => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    private loadSDK(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.mapsLoaded) {
                this.injectSDK().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });
            } else {
                reject('SDK already loaded');
            }

        });


    }

    private injectSDK(): Promise<any> {
        return new Promise((resolve, reject) => {
            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            };

            const script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if (this.apiKey) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
                reject('');
            }

            this.renderer.appendChild(this._document.body, script);
        });
    }

    private initMap(): Promise<any> {
        return new Promise((resolve) => {
            const latLng = new google.maps.LatLng(this.lat, this.lng);
            const mapOptions = {
                center: latLng,
                zoom: this.zoom
            };

            this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
            resolve(true);
        });
    }

    public addMarker(lat: number, lng: number): void {
        const latLng = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.markers.push(marker);
    }

    hideMarkers() {
        this.setMapOnAllMarkers(null);
    }

    showMarkers() {
        this.setMapOnAllMarkers(this.map);
    }

    deleteMarker(position: LatLng) {
        const index = this.markers.findIndex(m =>
            m.getPosition().lat() === position.lat
            && m.getPosition().lng() === position.lng);
        if (index > -1) {
            this.markers[index].setMap(null);
            this.markers.splice(index, 1);
        }
    }

    deleteMarkers() {
        this.hideMarkers();
        this.markers = [];
    }

    private setMapOnAllMarkers(map: google.maps.Map) {
        this.markers.forEach(marker => marker.setMap(map));
    }

}
