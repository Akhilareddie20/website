import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private apiKey = environment.googleMapsApiKey; // Your Google Maps API key
  constructor(private http: HttpClient) {}

  // Get user's current position
  getCurrentLocation(): Promise<GeolocationCoordinates | null> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  // Reverse geocode the coordinates to get the address
  reverseGeocode(lat: number, lng: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get(url).toPromise().then((response: any) => {
      if (response.status === 'OK') {
        return response.results[0]?.formatted_address || 'Address not found';
      } else {
        throw new Error('Unable to fetch address');
      }
    });
  }
}
