import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserData } from 'src/app/types/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData!: UserData
  constructor(
    public api:ApiService,
    public store:StorageService,
    public toast:ToastService,
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


  logout(){
    this.toast.showToast("Logging you out..","neutral-toast")
    this.api.logout().subscribe((res:any)=>{
      if (res.data) {
        this.store.logout()
      }
    })
  }

}
