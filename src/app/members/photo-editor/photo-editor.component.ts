import { Component, OnInit, Input, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EventEmitter } from '@angular/core';
import { findIndex } from 'rxjs/operators';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

@Output() GetMemberPhotoChange = new EventEmitter<string>();
@Input() photos: Photo[];
uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.apiUrl;

currentMain: Photo;


  constructor(private authService: AuthService, private userService: UserService, private alert: AlertifyService) { }


  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(photo.id, this.authService.decodeToken.nameid).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alert.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alert.confirm('do you want to delete the photo',
             () => this.userService.deletePhoto(id, this.authService.decodeToken.nameid).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
      this.alert.success('The Photo is removed');
      }, error => {
        this.alert.error(error);
      }));
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' +  localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
        });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, Headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
    }
  };
 }

}
