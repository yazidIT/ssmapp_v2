import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'news_announcement',
    loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
  },
  {
    path: 'detailnews/:newsurl',
    loadChildren: () => import('./detailnews/detailnews.module').then( m => m.DetailnewsPageModule)
  },
  {
    path: 'esearch',
    loadChildren: () => import('./esearch/esearch.module').then( m => m.EsearchPageModule)
  },
  {
    path: 'esearch-result',
    loadChildren: () => import('./esearch-result/esearch-result.module').then( m => m.EsearchResultPageModule)
  },
  {
    path: 'equery',
    loadChildren: () => import('./equery/equery.module').then( m => m.EqueryPageModule)
  },
  {
    path: 'ecompound',
    loadChildren: () => import('./ecompound/ecompound.module').then( m => m.EcompoundPageModule)
  },
  {
    path: 'ecompound-result',
    loadChildren: () => import('./ecompound-result/ecompound-result.module').then( m => m.EcompoundResultPageModule)
  },
  {
    path: 'status308',
    loadChildren: () => import('./status308/status308.module').then( m => m.Status308PageModule)
  },
  {
    path: 'status308-result',
    loadChildren: () => import('./status308-result/status308-result.module').then( m => m.Status308ResultPageModule)
  },
  {
    path: 'contact_us',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'equery-result',
    loadChildren: () => import('./equery-result/equery-result.module').then( m => m.EqueryResultPageModule)
  },
  {
    path: 'biztrust',
    loadChildren: () => import('./biztrust/biztrust.module').then( m => m.BiztrustPageModule)
  },
  {
    path: 'biztrust-scan',
    loadChildren: () => import('./biztrust-scan/biztrust-scan.module').then( m => m.BiztrustScanPageModule)
  },
  {
    path: 'biztrust-result',
    loadChildren: () => import('./biztrust-result/biztrust-result.module').then( m => m.BiztrustResultPageModule)
  },
  {
    path: 'biztrust-error',
    loadChildren: () => import('./biztrust-error/biztrust-error.module').then( m => m.BiztrustErrorPageModule)
  },
  {
    path: 'biztrust-connection-error',
    loadChildren: () => import('./biztrust-connection-error/biztrust-connection-error.module').then( m => m.BiztrustConnectionErrorPageModule)
  },
  {
    path: 'biztrust-user-guide',
    loadChildren: () => import('./biztrust-user-guide/biztrust-user-guide.module').then( m => m.BiztrustUserGuidePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
