import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { DoctorsService } from '../../../services/doctors.service';
import { Doctor } from '../../../models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css',
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    hospital: new FormControl('', Validators.required),
  });

  public hospitals: Hospital[] = [];
  public hospitalSelected: Hospital | any;
  public doctorSelected!: Doctor;

  constructor(
    private doctorService: DoctorsService,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadDoctor(id);
    });

    this.loadHospitals();

    this.doctorForm.get('hospital')!.valueChanges.subscribe((hospitalId) => {
      this.hospitalSelected = this.hospitals.find(
        (hospital) => hospital._id === hospitalId
      );
    });
  }

  loadDoctor(id: string) {

    if(id === 'new') {
      return
    }

    this.doctorService.getDoctorById(id)
      .pipe(

        delay(100)
      )
      .subscribe((doctor) => {

        if (!doctor) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }

        const { name, hospital } = doctor;
        const hospitalId = hospital?._id || '';

        this.doctorSelected = doctor;

        this.doctorForm.setValue({
          name,
          hospital: hospitalId
        });

        return true;
      });
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe(({hospitals}) => {
      /*        console.log(hospitals); */
      this.hospitals = hospitals;
    });
  }

  saveDoctor() {
    console.log(this.doctorSelected)

    if(this.doctorSelected){
      //update
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }

      this.doctorService.updateDoctor(data)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Updated', `${data.name} updated successfully`, 'success');
          this.router.navigateByUrl(`/dashboard/doctors`);
        })

    } else {
      //create

      const { name } = this.doctorForm.value;
      this.doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Created', `${name} created successfully`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor._id}`);
        });
    }

  }
}
