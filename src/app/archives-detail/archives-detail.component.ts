import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
@Component({
  selector: 'archives-detail',
  templateUrl: './archives-detail.component.html',
  styleUrls: ['./archives-detail.component.css']
})
export class ArchivesdetailComponent implements OnInit {
  userId:string = localStorage.getItem(sessionKey.USERID);
  id:string = "";
  detailid:Array<any> = [];
  dataList:Array<any> = [];
  isVisible = false;
  thisImg:string = "";

  showModal = (src) => {
    this.thisImg = src;
    this.isVisible = true;
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }

  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  constructor(
    private httpserver: HttpClient,
    private route: ActivatedRoute,
    public _message:NzMessageService
  ) {
  }

  iftis(){
    if(this.dataList.length==0){
      this.alertfn("warning","暂无可下载条目...")
    }else{

    }
  }

  download(key){
    if(key){
      window.open( port.BASE_URL + "/file/download?ids="+key+"&userId=" + this.userId)
    }else{
      let idsArr = this.dataList.map((item)=>{
        return  item.id;
      });
      if(this.dataList.length==0){
        this.alertfn("warning","暂无可下载条目...")
        return;
      }
      let ids = JSON.stringify(idsArr);
      ids = ids.substring(1,ids.length-1);
      window.open( port.BASE_URL + "/file/download?ids="+ids+"&userId=" + this.userId)
    }
  }
  toSee(key,url,id,size,limit){
    if(key=="0"){
      this.showModal(url);
    }else if(key=='1'){
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("error","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url = port.BASE_URL+name.file_preview;
      let data = {
        userId:this.userId,
        id:id
      }
      this.httpserver.post(url,data).subscribe(res=> {
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.alertfn("warning","该文件无法在线预览...")
    }
  }


  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });

    let url = port.BASE_URL+name.record_get;
    if(this.userId==null){
      this.userId = ""
    }
    let data = {userId :this.userId,id:this.id};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.detailid = data.detail;
        this.dataList = data.detail.files;
      }
    });


  }





}
