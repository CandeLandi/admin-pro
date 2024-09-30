import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchsService } from '../../../services/searchs.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { environment } from '../../../environments/environment';
import { delay, Subscription } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy{
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public loading: boolean = false;

  constructor(  private searchService: SearchsService,
                private userService: UserService,
                private modalImageService: ModalImageService) {}


  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
   this.loadUsers();

   this.modalImageService.newImage
   .pipe(
    delay(100)
   )
   .subscribe( img => this.loadUsers() )
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.desde)
    .subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.desde += value;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsers) {
      this.desde -= value;
    }

    this.loadUsers();
  }

  search( term: string ){

    if( term.length === 0){
      return this.users = this.usersTemp;
    }
    this.searchService.search('users', term )
    .subscribe( (  resp: any) => {
      this.users = resp;
    })
    return true;
  }

  deleteUser( user: User ){

    if (user.uid === this.userService.uid ) {
      return Swal.fire('Error', 'Cannot delete himself', 'error')
    }

    Swal.fire({
      title: "Delete user?",
      text: `${ user.name }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, I'm sure!"
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser( user )
        .subscribe( resp =>{
          this.loadUsers();
          Swal.fire(
            'User deleted',
            `${ user.name } was successfully deleted`,
            'success'
          )
        }
        )
      }
    });
    return true;
  }

  changeRole( user: User ){
    this.userService.saveUser(user)
    .subscribe( resp => {
      console.log(resp)
    })
  }

  openModal(user: User){
    console.log(user)
    this.modalImageService.openModal('users', user.uid, user.img);
  }
}
