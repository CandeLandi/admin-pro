import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css',
})
export class ModalImageComponent {
  public user!: User | any;
  public uploadImg?: File;
  public imgTemp?: any = '';

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(file: File) {
    this.uploadImg = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    console.log(file);
    return true;
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .updateImage(this.uploadImg!, type, id)
      .then( img => {
        if (this.user) {
          this.user.img = img;
        }
        Swal.fire('Guardado!', 'Tu imagen ha sido actualizada', 'success');

        this.modalImageService.newImage.emit(img);

        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error!', 'No se pudo subir la imagen', 'error');
      });
  }



}
