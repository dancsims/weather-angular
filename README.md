<h1 align="center">WeatherAngular</h1>

<p align="center">
<img src="https://github.com/dancsims/weather-angular/assets/59845032/c65cab14-e7af-49dc-8b76-b03a58064121">
</p>

## Key Features
* Geolocation - see weather for current location on page load
* City Search - see weather for a specified city
* Zip Search - see weather for a specified US zip code

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)), and [Angular CLI](https://angular.io/cli) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dancsims/weather-angular

# Go into the repository
$ cd weather-angular

# Install dependencies
$ npm install

# Run the app
$ ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running in Azure

To view this application running in a virtual network in Azure, install the associated Client Certificate (entering provided password) and VPN Configuration file. Once connected to the VPN, navigate to the provided address of the virtual machine hosting the application.

Command executed on host virtual machine:

```bash
# Host the app for https utilization inside virtual network
$ ng serve --ssl --host 0.0.0.0 --port 443
```

## Questions & Suggestions

Please open an issue [here](https://github.com/dancsims/weather-angular/issues).

## Credits

This software uses the following open source packages and sources:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [OpenWeatherAPI](https://openweathermap.org/api)
