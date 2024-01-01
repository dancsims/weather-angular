import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZipLocationData } from '../models/zipLocation.model';
import { CityLocationData } from '../models/cityLocation.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  // fetch location data by city from OpenWeatherAPI using city name and hardcoding a single return value
  getLocationDataByCity(location: string): Observable<CityLocationData> {
    return this.http.get<CityLocationData>('https://api.openweathermap.org/geo/1.0/direct', {
      params: new HttpParams()
      .set('q', location)
      .set('limit', 1)
      .set('appid', '78570f7e5a725cd10b6279f53495c701')
    })
  }

  // fetch location data from OpenWeatherAPI using zip code, and hardcoding a US country code for the zip
  getLocationDataByZip(location: string): Observable<ZipLocationData> {
    return this.http.get<ZipLocationData>('https://api.openweathermap.org/geo/1.0/zip', {
      params: new HttpParams()
      .set('zip', location+",US")
      .set('appid', '78570f7e5a725cd10b6279f53495c701')
    })
  }

  /*getGeolocation() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      console.log(position);
  }, this.errorHandler, {timeout: 5000});
  }

  private errorHandler() {}*/
}
