import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.css',
})
export class PromisesComponent implements OnInit {
  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
    /*    const  promise = new Promise( (resolve, reject ) => {

      if (false) {
        resolve('Hola mundo');
      } else {
        reject('Algo salió mal');
      }
    })

    promise.then( (message) => {
      console.log(message);
    })
    .catch( error => console.log('error'));

    console.log('Fin del init')
  }
 */

}

getUsuarios(){

  return new Promise( resolve => {

    fetch('https://reqres.in/api/users')
    .then( resp => resp.json() )
    .then( body => resolve( body.data ) );
  })
}
}
