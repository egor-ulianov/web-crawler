import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-crawl-map',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './crawl-map.component.html',
  styleUrl: './crawl-map.component.scss'
})
export class CrawlMapComponent {
  public onNodeSelect(event: any): void {
    console.log(event);
  }
}
