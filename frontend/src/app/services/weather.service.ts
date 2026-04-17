import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { ForecastData } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  // fetch weather data from backend proxy
  getWeatherData(
    lat: number,
    lon: number,
    units: string,
  ): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.apiBaseUrl}/api/weather`, {
      params: new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('units', units),
    });
  }

  getForecastData(
    lat: number,
    lon: number,
    units: string,
  ): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${environment.apiBaseUrl}/api/forecast`,
      {
        params: new HttpParams()
          .set('lat', lat)
          .set('lon', lon)
          .set('units', units),
      },
    );
  }
}
