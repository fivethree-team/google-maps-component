import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'native-map',
    pathMatch: 'full'
  },
  { path: 'native-map', loadChildren: './pages/native-map/native-map.module#NativeMapPageModule' },
  {
    path: 'native-map-bottom-sheet',
    loadChildren: './pages/native-map-bottom-sheet/native-map-bottom-sheet.module#NativeMapBottomSheetPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
