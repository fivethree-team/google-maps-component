import { FivBottomSheetModule } from '@fivethree/core';
import { GoogleMapsModule } from '@fivethree/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NativeMapBottomSheetPage } from './native-map-bottom-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: NativeMapBottomSheetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    FivBottomSheetModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NativeMapBottomSheetPage]
})
export class NativeMapBottomSheetPageModule { }
