import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { ForecastData } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // fetch weather data from OpenWeatherAPI using lat, lon, and hardcoding imperial units
  getWeatherData(lat: number, lon: number, units: string): Observable<WeatherData> {
    return this.http.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
      params: new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', units)
      .set('appid', '78570f7e5a725cd10b6279f53495c701')
    })
  }

  getForecastData(lat: number, lon: number, units: string): Observable<ForecastData> {
    return this.http.get<ForecastData>('https://api.openweathermap.org/data/2.5/forecast', {
      params: new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', units)
      .set('appid', '78570f7e5a725cd10b6279f53495c701')
    })
  }
}