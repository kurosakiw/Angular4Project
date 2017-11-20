import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { port,name,sessionKey } from '../public/datas/portName';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'adminone',
  templateUrl: './adminone.component.html',
  styleUrls: ['./adminone.component.css']
})

export class AdminoneComponent implements OnInit {
  _dataSet:Array<any> = [];
  downList:Array<any> = [];
  pageindex:number = 1;
  pagesize:number = 0;
  total:number = 0;
  ifadd:string = '1';
  userId:string = localStorage.getItem(sessionKey.USERID);
  _isSpinning:boolean = true;
  thstr:Array<any> = [
    "书名",
    "作者",
    "提交时间",
    "ISBN",
    "状态",
    "操作"
  ]
  landname:string = '';
  seedetail:Array<any> = [];
  currentimg:string = '';


  toSee(key,url,id,size,limit){
    if(key=="0"){
      this.currentimg = url;
    }else if(key=='1'){
      this.currentimg = '';
      if(parseInt(size)>parseInt(limit)){
        this.alertfn("error","文件过大，暂不支持在线预览...")
        return;
      }
      this.alertfn("success","正在打开...")
      let url =  port.BASE_URL+name.file_preview;
      let data = {
        userId:this.userId,
        id:id
      }
      this.httpserver.post(url,data).subscribe(res=> {
        let data = (res as any).detail;
        window.open(data.url)
      })
    }else{
      this.currentimg = '';
      this.alertfn("warning","该文件无法在线预览...")
    }
  }



  downLoad(key){
    window.open(  port.BASE_URL + "/file/download?ids="+key+"&userId=" + this.userId)
  }
  downAll(){
    let idsArr = this.downList.map((item)=>{
      return  item.id;
    });
    if(idsArr.length==0){
      this.alertfn("warning","没有可下载的附件...")
      return;
    }
    let ids = JSON.stringify(idsArr);
    ids = ids.substring(1,ids.length-1);
    window.open(  port.BASE_URL + "/file/download?ids="+ids+"&userId=" + this.userId)

  }


  alertfn = (type, text) => {
    this._message.create(type, text);
  };
  comfirmfn(title,content,fn){
    this._modal.confirm({
      title  : title,
      content: '<b>'+content+'</b>',
      onOk() {
        fn()
      },
      onCancel() {
      }
    });
  }
  //*to see*//
  isVisible = false;
  isConfirmLoading = false;

  showModal = (data) => {
    this.isVisible = true;
    this.getDetailc(data.id);
  }

  handleCancel = (e) => {
    this.currentimg = '';
    this.isVisible = false;
  }

  getDetailc(thisid){
    let url = "",data={
      userId:this.userId,
      id:thisid
    }
    if(this.ifadd=="1"){
      url = port.BASE_URL+name.lcollect_get;
    }else{
      url = port.BASE_URL+name.acollect_get;
    }
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      this.seedetail = data.detail;
      this.downList = data.detail.files;
    })

  }


  jumpToc(id){
    if(this.ifadd=="1"){
      this.router.navigate(['library-clue', id]);
    }else{
      this.router.navigate(['archives-clue', id]);
    }


  }
  deletes(key){
    let url,data = {
      userId:this.userId,
      ids:key
    };
    if(this.ifadd=="1"){
      url = port.BASE_URL+name.lcollect_deletes;
    }else{
      url = port.BASE_URL+name.acollect_deletes;
    }
    let _it = this;
    this.comfirmfn("确认删除？","是否删除当前选中条目",function(){
      _it.httpserver.post(url,data).subscribe(res=> {
        let code = (res as any).code;
        if(code==200){
          _it.alertfn("success","删除成功");
          _it.getDatas();
        }

      })
    })



  }

  getDatas(){
    let url,datas;
    if(this.ifadd=="1"){
      url = port.BASE_URL+name.lcollect_list;
    }else{
      url = port.BASE_URL+name.acollect_list
    }
    datas = {
      userId:this.userId,
      currentPage:this.pageindex
      };
    this.httpserver.post(url,datas).subscribe(res => {
      let data = (res as any);
      //console.log(JSON.stringify(data));
      this._dataSet = data.detail.collects;
      this.pageindex = data.detail.page.currentPage;
      this.total = data.detail.page.totalResult;
      this.pagesize = data.detail.page.showCount;

    });
  }

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public httpserver:HttpClient,
    public _message:NzMessageService,
    private _modal:NzModalService
  ) {

  }
  ngOnInit() {
    let key;
    this.route.params.subscribe(data => {
      key = data['id'];
      if(!key||key==''){
        this.ifadd = '1';
      }else{
        this.ifadd = key;
      }
      this.getDatas();
      if(this.ifadd=="1"){
        this.thstr = [
          "书名",
          "作者",
          "提交时间",
          "ISBN",
          "状态",
          "操作"
        ]
        this.landname = "图书"
      }else{
        this.thstr = [
          "档案名",
          "提交时间",
          "状态",
          "操作"
        ]
        this.landname = "档案"

      }

    });
  }

  ngAfterViewInit(){
    this._isSpinning=false;
  }


}
