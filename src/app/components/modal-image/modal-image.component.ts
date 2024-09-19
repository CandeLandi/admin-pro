import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})


export class ModalImageComponent {

  public hideModal: boolean = false;

  constructor(){}

  closeModal(){
    this.hideModal = true;
  }
}
