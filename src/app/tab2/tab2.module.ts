import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'success', component: Tab2Page }
    ])
  ],
  declarations: [Tab2Page, LoginComponent, RegistrationComponent]
})
export class Tab2PageModule {}
