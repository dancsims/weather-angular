import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { app } from '../../server';
import { debug } from 'console';
import { By } from '@angular/platform-browser';

/*
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
*/

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*
  it(`should have the 'weather-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('weather-angular');
  });
  */

  it('should render blank search box', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.textContent).toBe('');
  });

  //check location
  it('should not render location element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // fixture.whenStable().then(() => {
      // const debugElement = fixture.debugElement;

      
      // const formBox = debugElement.query(By.css('form')).nativeElement;
      // const searchBox = debugElement.query(By.css('input')).nativeElement;
      // searchBox!.innerText = 'Chicago';
//      formBox.submit();
      fixture.detectChanges();
  //    const compiled2 = fixture.nativeElement as HTMLElement;
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.location')?.innerHTML).toBeUndefined();
    // });
  });
  //check temperature
  it('should not render temperature element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.temperature')?.innerHTML).toBeUndefined();
  });
  //check weather-description
  it('should not render weather-description element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weather-description')?.innerHTML).toBeUndefined();
  });
  //check min
  it('should not render min element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.min')?.innerHTML).toBeUndefined();
  });
  //check max
  it('should not render max element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.max')?.innerHTML).toBeUndefined();
  });
  //check humidity
  it('should not render humidity element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.humidity')?.innerHTML).toBeUndefined();
  });
  //check wind
  it('should not render wind element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.wind')?.innerHTML).toBeUndefined();
  });
  //check precip
  it('should not render precip element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.precip')?.innerHTML).toBeUndefined();
  });
  //check pressure
  it('should not render pressure element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pressure')?.innerHTML).toBeUndefined();
  });
  //check sunrise
  it('should not render sunrise element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sunrise')?.innerHTML).toBeUndefined();
  });
  //check sunset
  it('should not render sunset element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sunset')?.innerHTML).toBeUndefined();
  });
});
