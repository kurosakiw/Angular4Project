import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { port,name,sessionKey } from '../datas/portName';

@Component({
  selector: 'library-foot',
  template: `
<div class="wrapBot">
			<div class="mainBox">
				<img class="icon" [src]="picurl+'29.png'">
				<div class="link">
					<dl>
						<dt>友情链接：</dt>
						<dd>
							<a>南京出版传媒集团</a>
						</dd>
						<dd>
							<a>南京出版社</a>
						</dd>
						<dd>
							<a>侵华日军南京大屠杀遇难同胞纪念馆</a>
						</dd>
						<dd>
							<a>中国第二历史档案馆</a>
						</dd>
					</dl>
				</div>
				<div class="rightBtn">
					<a routerLink="/archives"  >
						<img [src]="picurl+'30.png'">
						<p>数字档案馆</p>
					</a>
					<a routerLink="/propaganda"  >
						<img [src]="picurl+'13.png'">
						<p>数字宣教馆</p>
					</a>
				</div>
			</div>
		</div>
  `,
  styles: [`
  .wrapBot {
  width: 100%;
  height: 317px;
  background: url("../../assets/images/bottom.jpg") no-repeat left bottom;
}

.wrapBot .mainBox {
  position: relative;
}

.wrapBot .mainBox .icon {
  position: absolute;
  top: -73px;
  left: 441px;
}

.wrapBot .mainBox .link {
  position: absolute;
  top: 125px;
  left: 15px;
}

.wrapBot .mainBox .link dt {
  font-size: 16px;
  color: #640b04;
  margin-bottom: 5px;
}

.wrapBot .mainBox .link dd {
  line-height: 28px;
}

.wrapBot .mainBox .link dd a {
  font-size: 16px;
  color: #3a3a3a;
}

.wrapBot .mainBox .link dd a:hover {
  color: #640b04;
}

.wrapBot .mainBox .rightBtn {
  width: 330px;
  position: absolute;
  right: 0px;
  top: 125px;
}

.wrapBot .mainBox .rightBtn a {
  display: block;
  float: left;
  width: 115px;
  text-align: center;
  margin: 0 auto;
  margin-right: 40px;
}

.wrapBot .mainBox .rightBtn a p {
  font-size: 16px;
  color: #3a3a3a;
}
  `],

})
export class Library_footComponent {
  picurl = port.PIC_URL;


}
