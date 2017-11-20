import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { port,name,sessionKey } from '../public/datas/portName';
import { NzMessageService,NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
	picurl = port.PIC_URL;
  username:string='';
  clearSession(){
    this.router.navigate(['/public']);
    this.alertfn("success","退出成功")
    let ifc = localStorage.getItem(sessionKey.IFCLEAR);
    if(ifc=="0"){
      localStorage.removeItem(sessionKey.USERID);
      localStorage.removeItem(sessionKey.IFCLEAR);
    }else{
      localStorage.clear();
    }
  }
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private router:Router,
    public _message:NzMessageService

) {
  }

  ngOnInit() {
    let mobile = localStorage.getItem(sessionKey.MOBILE);
    let email = localStorage.getItem(sessionKey.EMAIL);
    let pwd = localStorage.getItem(sessionKey.PASSWORD);

    if(mobile){
      this.username = mobile;
    }
    if(email){
      this.username = email;
    }

  }




}
