import { NgModule,Component } from '@angular/core';
import { RouterModule, Routes,CanActivate} from '@angular/router';

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
import { AuthGuard } from './public/datas/auth.guard';

import { NothingComponent } from './no.component';

//public
import { Archives_topComponent }  from './public/pub-archives/archives-top.component';
import { Archives_footComponent }  from './public/pub-archives/archives-foot.component'
import { Library_topComponent }  from './public/pub-library/library-top.component';
import { Library_footComponent }  from './public/pub-library/library-foot.component'
import { WorshipComponent } from './worship/worship.component';
import { TimeComponent } from './timeline/timeline.component';
import { propagandaComponent }  from './propaganda/propaganda.component';
import { propagandalistComponent }  from './propaganda-list/propaganda-list.component';
import { propagandadetailComponent }  from './propaganda-detail/propaganda-detail.component';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes  = [
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: 'public', component: LayoutSideComponent},
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'library-list',
    component: LibrarylistComponent
  },
  {
    path: 'library-detail/:id',
    component: LibrarydetailComponent
  },
  {
    path: 'library-clue/:id',
    component: LibraryclueComponent
  },
  {
    path: 'special-list',
    component: LibraryspecialComponent
  },
  {
    path: 'special-show/:id',
    component: LibraryspecialshowComponent
  },
  {
    path: 'archives',
    component: ArchivesComponent
  },
  {
    path: 'archives-list',
    component: ArchiveslistComponent
  },
  {
    path: 'archives-detail/:id',
    component: ArchivesdetailComponent
  },
  {
    path: 'archives-clue/:id',
    component: ArchivesclueComponent
  },
  {
    path: 'propaganda',
    component: propagandaComponent,
  },
  {
    path: 'worship',
    component: WorshipComponent
  },
  {
    path: 'timeLine',
    component: TimeComponent
  },
  {
    path: 'propaganda-list/:type',
    component: propagandalistComponent,
  },
  {
    path: 'propaganda-detail/:id',
    component: propagandadetailComponent,
  },
  {
    path: 'classroom/:id',
    component: ClassroomComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children:[
      {path: "upload/:id", component: AdminoneComponent},
      {path:'info',component:AdmintwoComponent},
      {path:'reset',component:AdminthreeComponent},
      {
        path: '', component: AdminoneComponent
      }
    ]
  },
  {
    path:'**',
    component:NothingComponent
  }
  ];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
