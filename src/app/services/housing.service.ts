import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number) {
    return this.http.get<any>('data/properties.json').pipe(
      map((data) => {
        const properties: Array<any> = [];
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key].SellRent === SellRent) {
            properties.push(data[key]);
          }
        }
        return properties;
      })
    );
  }
}
