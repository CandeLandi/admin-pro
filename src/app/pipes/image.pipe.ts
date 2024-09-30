import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

const base_url = environment.base_url

@Pipe({
  name: 'imagePipe'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'|'doctors'|'hospitals'): string| any {
    if (
      img &&
      typeof img === 'string' &&
      img.includes('https')
    ) {
      return img;
    }

    // Si img es una cadena no vacía
    if (img && typeof img === 'string') {
      return `${base_url}/uploads/${type}/${img}`;
    } else {
      return `${base_url}/uploads/${type}/no-img`;
    }
  }

}

