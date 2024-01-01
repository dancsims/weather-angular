import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import {FormsModule, NgForm} from '@angular/forms';
import { LocationService } from './services/location.service';
import { ZipLocationData } from './models/zipLocation.model';
import { CityLocationData } from './models/cityLocation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor (private weatherService: WeatherService, private locationService: LocationService) { }

  // set some default values
  searchLocation: string = 'Mattoon';
  searchLat: number = 10;
  searchLon: number = 10;
  weatherData?: WeatherData;
  cityLocationData?: CityLocationData;
  zipLocationData?: ZipLocationData;

  // on page load, get users location then use to retrieve weather data
  ngOnInit(): void {
    // navigator needs to be encapsulated in here
    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          this.getWeatherData(position.coords.latitude, position.coords.longitude);
          // save off the lat and lon
          this.searchLat = position.coords.latitude;
          this.searchLon = position.coords.longitude;
          //console.log(position);
        }, this.errorHandler, {timeout: 5000});
      } 
    }
    // reset the search box to blank 
    this.searchLocation = '';
  }

  // on search bar submit, get location data based on text in search bar
  // getLocationData will retrieve weather data after location is determined
  onSubmit() {
    this.getLocationData(this.searchLocation);
    this.searchLocation = '';
  }

  // helper function to isolate weather data retrieval logic
  private getWeatherData(lat: number, lon: number) {
    this.weatherService.getWeatherData(lat, lon)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        //console.log(response);
        //console.log(this.weatherData);
      }
    });
  }

  // helper function to isolate location data retrieval logic
  private getLocationData(searchLocation: string) {
    // call separate functions from location service depending on number (zip) or anything else (city) 
    if (!isNaN(Number(searchLocation))) {
      this.locationService.getLocationDataByZip(searchLocation)
      .subscribe({
        next: (response) => {
          this.zipLocationData = response;
          //console.log(response);
          //console.log(this.zipLocationData);
          this.getWeatherData(this.zipLocationData.lat, this.zipLocationData.lon);
        }
    });
    } else {
      this.locationService.getLocationDataByCity(searchLocation)
      .subscribe({
        next: (response) => {
          this.cityLocationData = response;
          //console.log(response);
          //console.log(this.cityLocationData[0]);
          this.getWeatherData(this.cityLocationData[0].lat, this.cityLocationData[0].lon);
        }
      });
    }
  }

  // helper function to handle error functionality when attempting to retrieve users geolocation
  private errorHandler(positionError: GeolocationPositionError) {
    switch(positionError.code) {
      case positionError.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case positionError.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case positionError.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      // shouldnt be reached, but want to handle it just in case
      default:
        alert("An unknown error occurred.")
        break;
      } 
  }

  // precipitation data returned by OpenWeatherAPI will only include rain/snow object if it is snowing or raining
  getPrecip() {
    if (this.weatherData?.rain !== undefined) {
      return this.weatherData?.rain["1h"]
    }
    else if (this.weatherData?.snow !== undefined) {
      return this.weatherData?.snow["1h"]
    }
    else {
      return 0;
    };
  }

  // time data returned by OpenWeatherAPI needs to be converted before adjusting for timezone and formatting
  convertTime(timestamp: number, timezone: number) {
    // convert time zone from seconds to hours
    const convertTimezone = timezone / 3600
    // convert timestamp from seconds to milliseconds
    const date = new Date(timestamp * 1000)
    //console.log(date);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: `Etc/GMT${convertTimezone>=0?"-":"+"}${Math.abs(convertTimezone)}`});
  }
}