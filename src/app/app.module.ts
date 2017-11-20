import { NgModule,Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from  './app-route.module'
import { RouterModule, Routes } from '@angular/router';
import { PreviewimgService } from './public/previewimg/service';
import { QuillEditorModule } from 'ng2-quill-editor';
import {AuthGuard} from './public/datas/auth.guard';

import { AppComponent } from './app.component';
import { LayoutSideComponent } from './public/layout/layout.component';
import { LibraryComponent }  from './library/library.component';
import { LibrarylistComponent } from'./library-list/library-list.component'
import { LibrarydetailComponent } from'./library-detail/library-detail.component'
import { LibraryclueComponent }  from './library-clue/library-clue.component';
import { LibraryspecialComponent }  from './library-special/special-list.component';
import { LibraryspecialshowComponent }  from './library-special-show/special-show.component';
import { ArchivesComponent }  from './archives/archives.component';
import { ArchiveslistComponent }  from './archives-list/archives-list.component';
import { ArchivesdetailComponent }  from './archives-detail/archives-detail.component';
import { ArchivesclueComponent }  from './archives-clue/archives-clue.component';
import { AdminComponent }  from './admin/admin.component';
import { AdminoneComponent }  from './adminone/adminone.component';
import { AdmintwoComponent }  from './admintwo/admintwo.component';
import { AdminthreeComponent }  from './adminthree/adminthree.component';

import { NothingComponent } from './no.component';
import { PreviewimgComponent } from './public/previewimg/previewimg.component';
import { WorshipComponent } from './worship/worship.component';
//public
import { Archives_topComponent }  from './public/pub-archives/archives-top.component';
import { Archives_footComponent }  from './public/pub-archives/archives-foot.component';
import { Library_topComponent }  from './public/pub-library/library-top.component';
import { Library_footComponent }  from './public/pub-library/library-foot.component'
import { TimeComponent } from './timeline/timeline.component';
import { LoginCompentComponent } from './public/login-compent/login-compent.component';
import { RegistCompentComponent } from './public/regist-compent/regist-compent.component';
import { FogotPwdComponentComponent } from './public/fogot-pwd-component/fogot-pwd-component.component';
import { propagandaComponent }  from './propaganda/propaganda.component';
import { propagandalistComponent }  from './propaganda-list/propaganda-list.component';
import { propagandadetailComponent }  from './propaganda-detail/propaganda-detail.component';
import { ClassroomComponent } from './classroom/classroom.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutSideComponent,
    LibraryComponent,
    LibrarylistComponent,
    LibrarydetailComponent,
    LibraryclueComponent,
    LibraryspecialComponent,
    LibraryspecialshowComponent,
    ArchivesComponent,
    ArchiveslistComponent,
    ArchivesdetailComponent,
    ArchivesclueComponent,
    propagandaComponent,
    AdminComponent,
    AdminoneComponent,
    AdmintwoComponent,
    AdminthreeComponent,
    NothingComponent,
    Archives_topComponent,
    Archives_footComponent,
    Library_topComponent,
    Library_footComponent,
    PreviewimgComponent,
    WorshipComponent,
    TimeComponent,
    LoginCompentComponent,
    RegistCompentComponent,
    FogotPwdComponentComponent,
    propagandaComponent,
    propagandalistComponent,
    propagandadetailComponent,
    ClassroomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    QuillEditorModule,
    NgZorroAntdModule.forRoot()
  ],
  providers:[PreviewimgService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
