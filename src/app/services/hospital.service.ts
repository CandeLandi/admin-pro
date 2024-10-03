import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadHospitals(desde: number = 0) {
    const url = `${base_url}/hospitals?desde=${desde}`;
    return this.http.get<{ hospitals: Hospital[], total: number }>(url, this.headers)
      .pipe(
        map((resp) => ({
          total: resp.total,
          hospitals: resp.hospitals
        }))
      );
  }


  createHospital( name: string ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers)
  }

  updateHospital( _id: string ,name: string ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/hospitals/${ _id }`;
    return this.http.put(url, { name }, this.headers)
  }

  deleteHospital( _id: string ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/hospitals/${ _id }`;
    return this.http.delete(url, this.headers)
  }
}
