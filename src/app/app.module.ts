import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestaComponent } from './SharedComponents/testa/testa.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { AccediComponent } from './accedi/accedi.component';
import { PostComponent } from './post/post.component';
import { NuovopostComponent } from './nuovopost/nuovopost.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { NonTrovatoComponent } from './non-trovato/non-trovato.component';

import { GuardiaGuard } from './guardia.guard';

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
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'home', 
        component: HomeComponent, 
        canActivate: [GuardiaGuard],
      },
      { path: 'registrazione', 
        component: RegistrazioneComponent,
      },
      { path: 'accedi', 
        component: AccediComponent,
      },
      { path: 'profilo',
        component: ProfiloComponent,
      },
      { path: 'post/:id', 
        component: PostComponent,
      },
      { path: 'nuovopost', 
        component: NuovopostComponent,
      },
      { path: '', 
        redirectTo: '/accedi', 
        pathMatch: 'full'
      },
      { path: '**', 
        component: NonTrovatoComponent,
      }
    ], {onSameUrlNavigation: 'reload'}),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AvatarModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
