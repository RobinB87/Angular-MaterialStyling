import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../../models/user';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];

  user!: User;

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) {}

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit(): void {
    this.initializeUser();
  }

  save(): void {
    this.user.name = this.name.value;
    this.dialogRef.close(this.user);
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  initializeUser(): void {
    const notes = [
      {
        id: 0,
        title: '',
        date: new Date(),
      },
    ];

    this.user = {
      id: 0,
      birthDate: new Date(),
      name: '',
      avatar: '',
      bio: '',
      notes: notes,
    };
  }
}
