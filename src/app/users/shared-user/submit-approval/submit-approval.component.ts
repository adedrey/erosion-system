import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserPostService } from '../user-post.service';

@Component({
  selector: 'app-submit-approval',
  templateUrl: './submit-approval.component.html',
  styleUrls: ['./submit-approval.component.css']
})
export class SubmitApprovalComponent implements OnInit {
  approvalForm: FormGroup;
  postId: string;
  isLoading = false;
  title: string;
  constructor(
    public dialogRef: MatDialogRef<SubmitApprovalComponent>, @Inject(MAT_DIALOG_DATA) public data: { postId: string, title: string }, private userPostService: UserPostService) { }

  ngOnInit() {
    this.postId = this.data.postId;
    this.title = this.data.title
    this.approvalForm = new FormGroup({
      'documents': new FormControl(null, Validators.required)
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.approvalForm.patchValue({ documents: file });
    this.approvalForm.get('documents').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isLoading = true;
    const postData = {
      postId: this.postId,
      title: this.title,
      document: this.approvalForm.value.documents
    }
    this.userPostService.applyPost(postData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
