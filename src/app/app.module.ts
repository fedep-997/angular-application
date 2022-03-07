import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuardiaGuard } from './guardia.guard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HomeComponent } from './home/home.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { AccediComponent } from './accedi/accedi.component';
import { PostComponent } from './post/post.component';
import { NuovopostComponent } from './nuovopost/nuovopost.component';
import { NonTrovatoComponent } from './non-trovato/non-trovato.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccediComponent,
    PostComponent,
    NuovopostComponent,
    RegistrazioneComponent,
    NonTrovatoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent, canActivate: [GuardiaGuard]},
      {path: 'registrazione', component: RegistrazioneComponent},
      {path: 'accedi', component: AccediComponent},
      {path: 'post', component: PostComponent, canActivate: [GuardiaGuard]},
      {path: 'post/:id', component: PostComponent, canActivate: [GuardiaGuard]},
      {path: 'nuovopost', component: NuovopostComponent, canActivate: [GuardiaGuard]},
      {path: '',   redirectTo: '/accedi', pathMatch: 'full'},
      {path: '**', component: NonTrovatoComponent }
    ], {onSameUrlNavigation: 'reload'}),
    NgbModule,
    AvatarModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
