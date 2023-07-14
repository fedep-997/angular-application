import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { TestaComponent } from './componenti/SharedComponents/testa/testa.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { AccediComponent } from './componenti/accedi/accedi.component';
import { PostComponent } from './componenti/post/post.component';
import { NuovopostComponent } from './componenti/nuovopost/nuovopost.component';
import { ProfiloComponent } from './componenti/profilo/profilo.component';
import { NonTrovatoComponent } from './componenti/404/non-trovato.component';
import { FeedComponent } from './componenti/SharedComponents/feed/feed.component';
import { PiedeComponent } from './componenti/SharedComponents/piede/piede.component';
import { OpzioniComponent } from './componenti/opzioni/opzioni.component';
import { GuardiaGuard } from './guardia.guard';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccediComponent,
    PostComponent,
    NuovopostComponent,
    RegistrazioneComponent,
    NonTrovatoComponent,
    ProfiloComponent,
    TestaComponent,
    FeedComponent,
    PiedeComponent,
    OpzioniComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AvatarModule,
    NgxSkeletonLoaderModule,
    StoreModule.forRoot({}),
    RouterModule.forRoot(
      [
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [GuardiaGuard],
        },
        {
          path: 'registrazione',
          component: RegistrazioneComponent,
        },
        {
          path: 'accedi',
          component: AccediComponent,
        },
        {
          path: 'profilo/:id',
          component: ProfiloComponent,
        },
        {
          path: 'post/:id',
          component: PostComponent,
        },
        {
          path: 'nuovopost',
          component: NuovopostComponent,
        },
        {
          path: 'opzioni',
          component: OpzioniComponent,
        },
        { path: '', redirectTo: '/accedi', pathMatch: 'full' },
        { path: '**', component: NonTrovatoComponent },
      ],
      { onSameUrlNavigation: 'reload' }
    )
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
