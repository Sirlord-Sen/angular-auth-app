import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserData } from 'src/app/types/type';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  userData!: UserData
  
  constructor(
    public api: ApiService,
    public store: StorageService
  ) { }

  ngOnInit(): void {
    this.userData = this.store.getData()
    if(this.userData.profile.picture){
      this.userData.profile.picture = "http://daba-exercise-app.herokuapp.com/public/"+this.userData.profile.picture
    }
     else{
       this.userData.profile.picture = '/assets/images/user.png'
    } 
       
      
    }
    

}
