import { environment } from '../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string | any,
    public uid?: string
  ) {}

  get imageUrl() {

    if (
      this.img &&
      typeof this.img === 'string' &&
      this.img.includes('https')
    ) {
      return this.img;
    }

    // Si img es una cadena no vacía
    if (this.img && typeof this.img === 'string') {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/no-img`;
    }
  }
}
