import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
