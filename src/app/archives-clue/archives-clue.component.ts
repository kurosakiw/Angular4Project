import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { port,name,sessionKey } from '../public/datas/portName';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'archives-clue',
  templateUrl: './archives-clue.component.html',
  styleUrls: ['./archives-clue.component.css']
})

export class ArchivesclueComponent implements OnInit {
  userId:string = localStorage.getItem(sessionKey.USERID);
  _isSpinning:boolean = true;
  options = [];
  selectedOption;
  description:string = '';
  title:string;
  id:string = '';
  fileList:Array<any> = [];
  names:string = "文件上传";
  seeurl:string = '';
  width:number = 900;

  //**upload--
  randomWord(randomFlag, min, max){
    var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
      var pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
    }
    return str;
  }

  isVisible = false;
  radomstr:string = '';
  src:any;
  showModal = (str) => {
    if(str=="文件上传"){
      this.names = str;
      this.width = 900;
    }else{
      this.width = 500;
    }

    this.isVisible = true;
  }

  handleCancel = (e) => {
    if(this.names=="查看图片"){

    }else{
      this.getfiles();
    }
    this.isVisible = false;
  }
  toDos(key,url,id,size,limit){
    if(key=="0"){
      this.names = "查看图片";
      this.seeurl = url;
      this.showModal("0");
    }else if(key=="1"){
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("warning","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url = port.BASE_URL+name.file_preview;
      let data = {
        userId:this.id,
        id:id
      }
      this.httpserver.post(url,data).subscribe(res=> {
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.alertfn("warning","该文件无法预览")
    }
  }

  getfiles(){
    let url = port.BASE_URL+name.file_list;
    let data = {
      userId:this.userId,
      rid:this.id,
      type:3,
      uploadkey:this.radomstr
    }
    this.httpserver.post(url,data).subscribe(res=> {
      let data = (res as any);
      this.fileList = data.detail;

    })
  }
  remove(ids){
    let url = port.BASE_URL+name.file_delete;
    let data = {
      userId:this.userId,
      rid:this.id,
      type:3,
      aid:ids
    }
    this.httpserver.post(url,data).subscribe(res=> {
      let data = (res as any);
      if(data.code==200){
        this.alertfn("success","删除成功")
        this.getfiles()
      }
    })
  }
  //**--upload
  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  onContentChanged({ html, text }) {
  }
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    //console.log(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    let mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!control.value) {
      return { required: true };
    } else if (!mobieReg.test(this.validateForm.controls[ 'mobile' ].value)) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private sanitizer: DomSanitizer,
    private httpserver: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public _message:NzMessageService
  ) {
    this.validateForm = this.fb.group({
      name             : [ '', [ Validators.required ] ],
      email            : [ '', [ Validators.email ] ],
      mobile           : [ '', [ Validators.required ,this.confirmationValidator] ],
      address          : [ '', [ Validators.required ] ],
      title            : [ '', [ Validators.required ] ],
      archive          : [ '', [ Validators.required ] ],
      number           : [ '', [ Validators.required ] ],
      description      : [ '', [ Validators.required ] ],
    });
  }

  ngOnInit() {
    let key;
    this.route.params.subscribe(data => {
      key = data['id'];
    })
    if(!key||key=="null"){
    }else{
      this.id = key;
      this.getfiles();
      let url = port.BASE_URL+name.acollect_get,
        data = {
          userId:this.userId,
          id:key
        }
      this.httpserver.post(url,data).subscribe(res => {
        let data = (res as any).detail;
        //console.log(JSON.stringify(data));
        this.description = data.description;
        this.validateForm = this.fb.group({
          name             : [ data.name, [ Validators.required ] ],
          email            : [ data.email, [ Validators.email ] ],
          mobile           : [ data.mobile, [ Validators.required ,this.confirmationValidator] ],
          address          : [ data.address, [ Validators.required ] ],
          title            : [ data.title, [ Validators.required ] ],
          archive          : [ data.archive, [ Validators.required ] ],
          number           : [ data.number, [ Validators.required ] ],
          description      : [ '', [ ] ],
        });
      })
    }
    this.radomstr = this.randomWord(false,43,0);
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl("http://192.168.11.25:1655?userId="+this.id+"&source=0&rid="+this.id+"&type=3&uploadkey="+ this.radomstr);
    this._isSpinning = false;
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
  kia(){
    let url = port.BASE_URL+name.acollect_save;
    let data = this.validateForm.value;
    data["userId"] = this.userId;
    data["id"] = this.id;
    if(!this.validateForm.valid){
      return;
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
        if(data.code == 200){
         this.alertfn("success","提交成功");
         history.go(-1);
       }
    });

  }


}
