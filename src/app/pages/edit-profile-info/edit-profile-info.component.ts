import { Component, OnInit, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { updatePhoto } from 'src/app/queries';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserData } from 'src/app/types/type';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.scss'],
})
export class EditProfileInfoComponent implements OnInit {
  userData!: UserData;
  photoForm!: FormData;
  photoElement!: any;
  username!: string;
  bio!: string;
  password!: string;
  phone!: string;
  email!: string;
  profilePic: any = '/assets/images/user.png';

  @ViewChildren('img') img!: HTMLInputElement;

  constructor(
    public api: ApiService,
    public toast: ToastService,
    public router: Router,
    private sanitizer: DomSanitizer,
    public store: StorageService
  ) {}

  ngOnInit(): void {
    this.userData = this.store.getData();

    this.username = this.userData.user.name;
    this.bio = this.userData.profile.bio;
    this.phone = this.userData.profile.phone;
    this.email = this.userData.user.email;
    if (this.userData.profile.picture) {
      this.profilePic =
        'https://daba-exercise-app.herokuapp.com/public/' +
        this.userData.profile.picture;
    }

    this.photoElement = document.getElementById('photoElem');
  }

  save() {
    let fiedsObsr  = this.api
      .updateUser({
        username: this.username ? this.username : 'null',
        bio: this.bio ? this.bio : 'null',
        fullname: this.username ? this.username : 'null',
        password: this.password ? this.password : 'null',
        phone: this.phone ? this.phone : 'null',
        email: this.email ? this.email : 'null',
      })
      let photoObsr
      if(this.photoForm) {photoObsr = this.api._updatePhoto(this.photoForm)}
      else{ photoObsr = undefined }
    if(this.photoForm){
      Promise.all([fiedsObsr.toPromise(),photoObsr]).then((res:any)=>{
        let userData: UserData = this.store.getData();
        let fields = res[0].data;
        res[1].json().then(({data}:any)=>{
          if (data) {
            userData.profile.picture = data.uploadPhoto.photo;
            userData.profile.bio = fields.updateUser.profile.bio;
            userData.profile.phone = fields.updateUser.profile.phone;
            userData.user.email = fields.updateUser.user.email;
            userData.user.name = fields.updateUser.user.name;
            userData.user.username = fields.updateUser.user.username;
            userData.user.id = fields.updateUser.user.id;
            this.store.saveUserData(userData);
            this.toast.showToast('Saved', 'success-toast');
          }
        })
      })
    }else{
      fiedsObsr.subscribe(({ data }: any) => {
        if (data) {
          let userData: UserData = this.store.getData();
          userData.profile.bio = data.updateUser.profile.bio;
          userData.profile.phone = data.updateUser.profile.phone;
          userData.user.email = data.updateUser.user.email;
          userData.user.name = data.updateUser.user.name;
          userData.user.username = data.updateUser.user.username;
          userData.user.id = data.updateUser.user.id;
          this.store.saveUserData(userData);
          this.toast.showToast('Saved', 'success-toast');
        }
      })
    }

  }

  getImage(e: any) {
    let file: File = e.target.files[0];
    this.profilePic = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
    let map = {
      file: ['variables.file'],
    };
    this.photoForm = new FormData();
    this.photoForm.append('operations', JSON.stringify(updatePhoto()));
    this.photoForm.append('map', JSON.stringify(map));
    this.photoForm.append('file', file);
  }
}
