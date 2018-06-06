import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UserService} from './services/user.service';
import {AuthenticationService} from './services/authentication.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartModule } from 'angular-highcharts';




import { AppComponent } from './app.component';

import 'rxjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExerciseComponent } from './exercise/exercise.component';

import { ExerciseService } from './services/exercise.service';
import {FoodService} from './services/food.service'


import { SuggestionComponent } from './suggestion/suggestion.component';

import { FoodComponent } from './food/food.component';
import { EditexerciseComponent } from './editexercise/editexercise.component';
import { ProfileComponent } from './profile/profile.component';
import { EditfoodComponent } from './editfood/editfood.component';


const routes: Routes = [
 
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'exercise', component: DashboardComponent, pathMatch: 'full' },
  { path: 'homepage', component: LandingpageComponent, pathMatch: 'full' },
  { path:'dashboard', component:ExerciseComponent,pathMatch:'full'},
  { path: 'food', component:FoodComponent, pathMatch:'full'},
  { path: 'profile', component:ProfileComponent, pathMatch:'full'},
  {path:'editExercise/:id',component:EditexerciseComponent,pathMatch:'full'},
  {path:'editFood/:id',component:EditfoodComponent,pathMatch:'full'},
  {path:'suggestions',component:SuggestionComponent,pathMatch:'full'}
  
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingpageComponent,
    DashboardComponent,
    ExerciseComponent,
    SuggestionComponent,
    FoodComponent,
    EditexerciseComponent,
    ProfileComponent,
    EditfoodComponent,
    
   
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    FormsModule,
    ChartModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()

  ],
  
  providers: [UserService,AuthenticationService,ExerciseService,FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
