import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {


  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  constructor(private htpp: CategoryService) { }

  ngOnInit(): void {
  }


  delete() {
    if (this.data != null) {
      this.htpp.deleteCategory(this.data.id).subscribe((data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    } else {
      this.dialogRef.close(2);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
