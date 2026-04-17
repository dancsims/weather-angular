import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZipLocationData } from '../models/zipLocation.model';
import { CityLocationData } from '../models/cityLocation.model';
import { GeoLocationData } from '../models/geoLocation.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  // fetch location data by city from backend
  getLocationDataByCity(location: string): Observable<CityLocationData> {
    return this.http.get<CityLocationData>(
      `${environment.apiBaseUrl}/api/geo/city`,
      {
        params: new HttpParams().set('q', location).set('limit', 1),
      },
    );
  }

  // fetch location data by zip from backend
  getLocationDataByZip(location: string): Observable<ZipLocationData> {
    return this.http.get<ZipLocationData>(
      `${environment.apiBaseUrl}/api/geo/zip`,
      {
        params: new HttpParams().set('zip', location + ',US'),
      },
    );
  }

  // fetch location data by geo coordinates from backend
  getLocationDataByGeo(lat: number, lon: number): Observable<GeoLocationData> {
    return this.http.get<GeoLocationData>(
      `${environment.apiBaseUrl}/api/geo/reverse`,
      {
        params: new HttpParams()
          .set('lat', lat)
          .set('lon', lon)
          .set('limit', 1),
      },
    );
  }
}
