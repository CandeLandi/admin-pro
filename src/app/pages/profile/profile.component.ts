import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user?: User | any;
  public uploadImg?: File;
  public imgTemp?: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.user!.name = name;
      this.user!.email = email;

      Swal.fire('Saved!', 'your changes were saved', 'success');
    }, (err) => {
      Swal.fire('Error!', err.error.msg, 'error');
    });
  }

  changeImage(file: File) {

    this.uploadImg = file;

    if( !file ){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
    console.log(file)
    return true;
  }

  uploadImage(){
    this.fileUploadService
    .updateImage( this.uploadImg!, 'users', this.user.uid)
    .then( img => {
      this.user.img = img
      Swal.fire('Saved!', 'your image were changed', 'success');
    }).catch( err => {
      Swal.fire('Error!', err.error.msg, 'error');

    })
  }
}
