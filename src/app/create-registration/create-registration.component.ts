import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';
import { user } from './model/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Monthly', 'Quaterly', 'Yearly'];
  public genders = ['Male', 'Female'];
  public importentlist: string[] = [
    'Toxic Fat Reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive system',
    'Sugar Craving Body',
    'Fitness',
  ];
  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      FirstName: [],
      LastName: [],
      Email: [],
      Mobile: [],
      weight: [],
      Height: [],
      Bmi: [],
      bmiResult: [],
      gender: [],
      TrainerOpt: [],
      package: [],
      important: [],
      haveGymBefore: [],

      picker: [],
    });
    this.registerForm.controls['Height'].valueChanges.subscribe((res) => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate).subscribe((res) => {
        this.fillFormToUpdate(res);
        this.isUpdateActive = true;
      });
    });
  }
  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe((res) => {
      this.toastService.success({
        detail: 'Sucess',
        summary: 'Enquiry Added',
        duration: 3000,
      });
      this.registerForm.reset();
    });
  }
  update() {
    this.api
      .updateRegisterUser(this.registerForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        this.toastService.success({
          detail: 'Sucess',
          summary: 'Enquiry Updated',
          duration: 3000,
        });
        this.registerForm.reset();
      });
  }
  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['Bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case bmi >= 25 && bmi < 30:
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;

      default:
        this.registerForm.controls['bmiResult'].patchValue('Obses');
        break;
    }
  }
  fillFormToUpdate(user: user) {
    this.registerForm.setValue({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Mobile: user.Mobile,
      weight: user.weight,
      Height: user.Height,
      Bmi: user.Bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      TrainerOpt: user.TrainerOpt,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      picker: user.picker,
    });
  }
}
