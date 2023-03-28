import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Routes } from '@angular/router';
import { ApiService } from '../api.service';
import { user } from '../create-registration/model/user.model';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  public dataSource!: MatTableDataSource<user>;
  public Users!: user[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;
  public displayedColumns: string[] = [
    'id',
    'FirstName',
    'LastName',
    'Email',
    'Mobile',
    'weight',
    'Height',
    'Bmi',
    'bmiResult',
    'gender',
    'TrainerOpt',
    'package',
    'important',
    'haveGymBefore',
    'picker',
    'action',
  ];
  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegisteredUser().subscribe((res) => {
      this.Users = res;
      this.dataSource = new MatTableDataSource(this.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.Sort;
      console.log(this.dataSource);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(id: number) {
    this.router.navigate(['update', id]);
  }
  delete(id: number) {
    this.confirm.showConfirm(
      'Are you sure want to delete?',
      this.confirmDeleteUser.bind(this, id),
      this.cancelDeleteUser
    );
  }

  confirmDeleteUser(id: number) {
    this.api.deleteRegistered(id).subscribe((res) => {
      this.getUsers();
      this.toast.success({
        detail: 'Sucess',
        summary: 'Enquiry Deleted',
        duration: 3000,
      });
    });
  }

  cancelDeleteUser() {}
}
