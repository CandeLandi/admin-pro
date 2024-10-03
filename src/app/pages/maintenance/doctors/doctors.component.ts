import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchsService } from '../../../services/searchs.service';
import { DoctorsService } from '../../../services/doctors.service';
import { Doctor } from '../../../models/doctor.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public doctors: Doctor[] = [];
  private imgSubs!: Subscription;
  public desde: number = 0;
  public totalDoctors: number = 0;

  constructor(
    private searchService: SearchsService,
    private doctorsService: DoctorsService,
    private modalImageService: ModalImageService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadDoctors());
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadDoctors();
    }
    this.searchService
      .search('doctors', term)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
      });
  }

  loadDoctors() {
    this.loading = true;

    this.doctorsService.loadDoctors(this.desde).subscribe(({doctors, total}) => {
      this.doctors = doctors;
      this.totalDoctors = total;
      this.loading = false;
    });
  }


  changePage(value: number) {
    this.desde += value;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalDoctors) {
      this.desde -= value;
    }

    this.loadDoctors();
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id!, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Do you want delete the doctor',
      text: `${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Yes, I'm sure!",
    }).then((result) => {
      if (result.value) {
        this.doctorsService.deleteDoctor(doctor._id!).subscribe((resp) => {
          this.loadDoctors();
          Swal.fire('Deleted', doctor.name, 'success');
        });
      }
    });
  }
}
