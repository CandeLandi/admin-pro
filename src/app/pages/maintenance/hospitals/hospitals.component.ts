import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css',
})
export class HospitalsComponent implements OnInit, OnDestroy{
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private modalImageService: ModalImageService,
    private hospitalService: HospitalService,
    private searchService: SearchsService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadHospitals());
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadHospitals();
    }
    this.searchService.search('hospitals', term).subscribe((resp) => {
      this.hospitals = resp;
    });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Saved', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Do you want delete the hospital',
      text: `${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Yes, I'm sure!",
    }).then((result) => {
      if (result.value) {
        this.hospitalService.deleteHospital(hospital._id!).subscribe((resp) => {
          this.loadHospitals();
          Swal.fire('Deleted', hospital.name, 'success');
        });
      }
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'New hospital',
      text: 'Enter hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    });
    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      });
    }
    console.log(value);
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id!, hospital.img);
  }
}
