import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class JsonService {
  constructor(private http: HttpClient) { }

  getData() {
    console.info("calling...")
    return this.http
      .get('assets/test.json')
      // .pipe(map(x => x));
  }
}