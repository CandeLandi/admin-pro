import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateImage(
    file: File ,
    type: 'users' | 'doctors' | 'hospitals'| any,
    id: string
  ){
    try {
      const url = `${ base_url }/uploads/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      console.log(data)

      if( data.ok ){
        console.log(data.fileName); // Acá ecibo bien el path

        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch(error) {
      console.log(error)
      return false;
    }
  }

}
