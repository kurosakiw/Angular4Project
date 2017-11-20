import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { port,name,sessionKey } from '../public/datas/portName';
@Component({
  selector: 'archives-list',
  templateUrl: './archives-list.component.html',
  styleUrls: ['./archives-list.component.css']
})

export class ArchiveslistComponent implements OnInit {
  _isSpinning:boolean = true;
  userId:string = localStorage.getItem(sessionKey.USERID);
  title:string = "";
  listID:string = '';
  key:string='';
  SelectedIndex:number = 3;
  lists:Array<any> = [];
  listdetail:Array<any> = [];
  archive:number;
  keyword:string = "";
  pageindex:number=1;
  showCount:number=0;
  totalPage:number=0;
  selectedOption:string = "";
  searchOptions = [
    { value: '2', label: '新增' },
    { value: '1', label: '精选' },
    { value: '0', label: '全部' }
  ];
  like;

  constructor(
    private httpserver: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    let thiskey;
    this.route.params.subscribe(data => {
      this.listID = data['id'];//guan
      thiskey = data['item'];//dijige
      this.selectedOption = data['ifs'];//leixing
      this.keyword = data['keyword'];
      //this.key = data['key']
      this.getInit(thiskey)

    });


  }

  //列表
  tabs = [];
  nzTabPosition = 'left';
  _console(id) {
    this.listID = id;
    this.getLists()
  }

  getLists(){
    let url = port.BASE_URL+name.record_list;
    let data = {
      userId :this.userId,
      archive:this.listID,
      whole:this.keyword,
      currentPage:this.pageindex,
      type:this.selectedOption
    };
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.listdetail = data.detail.records;
        this.pageindex = data.detail.page.currentPage;
        this.totalPage = data.detail.page.totalResult;
        this.showCount = data.detail.page.showCount;
        if(!this.lists[this.SelectedIndex]){
          return;
        }
        this.title = this.lists[this.SelectedIndex].name;
        this._isSpinning = false;
      }
    });
  }
  getInit(thiskey){
    let url = port.BASE_URL+name.archive_list;
    let data = { userId :this.userId,id:this.listID};
    this.httpserver.post(url,data).subscribe(res => {
      let data = (res as any);
      if(data.code == 200){
        this.lists = data.detail;
        this.lists.push({name:"全部档案",id:""});
        setTimeout(()=>{
          let title = this.lists[thiskey]
          this.title = title.name;
        },200)
      }
      this.SelectedIndex = thiskey;
      this.getLists()
    });
  }








}
