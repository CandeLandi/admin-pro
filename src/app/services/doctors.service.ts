import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Doctor } from '../models/doctor.model';
import { map } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor( private http: HttpClient ) { }

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

  loadDoctors(desde: number = 0) {
    const url = `${base_url}/doctors?desde=${desde}`;
    return this.http.get<{ doctors: Doctor[], total: number }>(url, this.headers)
      .pipe(
        map((resp) => ({
          total: resp.total,
          doctors: resp.doctors
        }))
      );
  }


  getDoctorById( id: string ) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.get<{ok: boolean, doctor: Doctor}>(url, this.headers)
    .pipe(
      map( resp => resp.doctor )
    )
  }

  createDoctor( doctor: { name: string, hospital: string} ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers)
  }

  updateDoctor( doctor: Doctor  ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/doctors/${ doctor._id }`;
    return this.http.put(url, doctor, this.headers)
  }

  deleteDoctor( _id: string ) {
    //localhost:3000/api/users?desde=0
    const url = `${base_url}/doctors/${ _id }`;
    return this.http.delete(url, this.headers)
  }
}
