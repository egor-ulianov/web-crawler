import { Routes } from '@angular/router';
import { CrawlListComponent } from './components/crawl-list/crawl-list.component';
import { CrawlDetailsComponent } from './components/crawl-details/crawl-details.component';
import { CrawlExecutionsListComponent } from './components/crawl-executions-list/crawl-executions-list.component';
import { CrawlMapComponent } from './components/crawl-map/crawl-map.component';

export const routes: Routes = [
    { path: 'crawl-list', component: CrawlListComponent },
    { path: 'crawl-details/:id', component: CrawlDetailsComponent},
    { path: 'crawl-details', component: CrawlDetailsComponent},
    { path: 'crawl-execution-list', component: CrawlExecutionsListComponent},
    { path: 'crawl-map', component: CrawlMapComponent},
    { path: '', redirectTo: '/crawl-list', pathMatch: 'full' }
];
