import { Component, OnInit } from '@angular/core';
import { NgxGraphModule, Node, Edge } from '@kr0san89/ngx-graph';
import { RecordsService } from '../../shared/services/records.service';
import { CrawlRecordsRequest } from '../../shared/models/request-models/crawl-records-request/crawl-records-request';
import { CrawlData } from '../../shared/models/crawl-data/crawl-data';
import { MapDynamicEnum } from '../../shared/enums/map-dynamic.enum';
import { MapViewEnum } from '../../shared/enums/map-view.enum';
import { CrawlDataNode } from '../../shared/models/crawl-data-node/crawl-data-node';
import { MatDialog } from '@angular/material/dialog';
import { CrawlDataModalComponent } from '../../shared/components/crawl-data-modal/crawl-data-modal.component';
import { SitesService } from '../../shared/services/sites-service.service';


@Component({
  selector: 'app-crawl-map',
  standalone: true,
  imports: [NgxGraphModule],
  templateUrl: './crawl-map.component.html',
  styleUrl: './crawl-map.component.scss'
})
export class CrawlMapComponent implements OnInit {

  public nodesSet: Set<string>;
  public nodesDataDictionary: Map<string, CrawlDataNode>;
  public links: Edge[] = [];
  public nodes: Node[] = [];
  public graphSize: [number, number];

  public mapDynamics: MapDynamicEnum;
  public mapViewType: MapViewEnum;

  private timeout: NodeJS.Timeout | undefined | null;

  public get isStatic(): boolean {
    return this.mapDynamics === MapDynamicEnum.Static;
  }

  public get isDynamic(): boolean {
    return this.mapDynamics === MapDynamicEnum.Dynamic;
  }

  public get isFullView(): boolean {
    return this.mapViewType === MapViewEnum.Full;
  }

  public get isDomainsView(): boolean {
    return this.mapViewType === MapViewEnum.Domains;
  }

  constructor(private readonly _recordService: RecordsService,
    private readonly _sitesService: SitesService,
    public dialog: MatDialog
  ) {
    this.nodesSet = new Set<string>();
    this.nodesDataDictionary = new Map<string, CrawlDataNode>();
    this.mapDynamics = MapDynamicEnum.Static;
    this.mapViewType = MapViewEnum.Full;
    this.graphSize = [window.innerWidth - 100, window.innerHeight - 100];
    console.log(this.graphSize);
   }

  public ngOnInit(): void {
    this.switchToFullView();
  }

  public onNodeSelect(event: any): void {
    console.log(event);
    const dialogRef = this.dialog.open(CrawlDataModalComponent, {
      height: '400px',
      width: '600px',
      position: { top: '50px' },
    });

    if (dialogRef.componentRef)
      if (event.data.hasOwnProperty('url'))
        dialogRef.componentRef.instance.crawlData = event.data as CrawlDataNode;
      else
        dialogRef.componentRef.instance.outerUrl = event.id as string;

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.switchToDynamic();
    });

  }

  public switchToDomainsView(): void {
    this.mapViewType = MapViewEnum.Domains;
    this.obtainDomainView();
  }

  public switchToFullView(): void {
    this.mapViewType = MapViewEnum.Full;
    this.obtainFullView();
  }

  public switchToDynamic(): void {
    this.mapDynamics = MapDynamicEnum.Dynamic;

    this.timeout = setInterval(() => {
      this.obtainNewView();
    }, 5000);
  }

  public switchToStatic(): void {
    this.mapDynamics = MapDynamicEnum.Static;

    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  private obtainNewView(): void {
    if (this.isDomainsView) {
      this.obtainDomainView();
    } else {
      this.obtainFullView();
    }
  }

  private obtainDomainView(): void {
    const request: CrawlRecordsRequest = new CrawlRecordsRequest(this._sitesService.selectedWebsiteIds);
    this._recordService.getRecordsFromSourceNodes(request).subscribe((data: any) => {
      this.resetData();
      this.formatCrawlDataDomainView(data);
    });
  }

  private obtainFullView(): void {
    const request: CrawlRecordsRequest = new CrawlRecordsRequest(this._sitesService.selectedWebsiteIds);
    this._recordService.getRecordsFromSourceNodes(request).subscribe((data: any) => {
      this.resetData();
      this.formatCrawlData(data);
    });
  }

  private formatCrawlData(crawlDataArray: CrawlData[]): void {
    for (const data of crawlDataArray) {
      let nodeData = this.nodesDataDictionary.get(data.url);
      if (!nodeData) {
        nodeData = new CrawlDataNode([data.startingNodeId], data.url, data.crawlTime, data.title, data.links);
        this.nodesDataDictionary.set(data.url, nodeData);
        this.nodesSet.add(data.url);
      } else {
        nodeData.addData(data);
      }
  
      this.nodes.push({ id: data.url, label: data.title, data: nodeData });
    }

    console.log("Format stage 1");
  
    for (const data of crawlDataArray) {
      for (const linkUrl of data.links) {
        this.links.push({ source: data.url, target: linkUrl, label: 'is parent of' });
        if (!this.nodesSet.has(linkUrl)) {
          this.nodes.push({ id: linkUrl, label: linkUrl, data: {color: "#afafaf"} });
          this.nodesSet.add(linkUrl);
        }
      }
    }

    console.log("Format stage 2");
  }

  private resetData(): void {
    this.nodes = [];
    this.links = [];
    this.nodesSet.clear();
  }

  private formatCrawlDataDomainView(crawlDataArray: CrawlData[]): void {

    const getDomain = (url: string) => {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return new URL(url).hostname;
      }

      return null;
    };

    for (const data of crawlDataArray) {
      const domain = getDomain(data.url);

      if (domain === null)
        continue;

      this.nodes.push({ id: domain, label: domain, data: data });
      this.nodesSet.add(domain);
    }

    for (const data of crawlDataArray) {
      const sourceDomain = getDomain(data.url);
      if (sourceDomain === null)
        continue;

      for (const linkUrl of data.links) {
        const targetDomain = getDomain(linkUrl);
        if (targetDomain === null)
          continue;

        this.links.push({ source: sourceDomain, target: targetDomain, label: 'is parent of' });
        if (!this.nodesSet.has(targetDomain)) {
          this.nodes.push({ id: targetDomain, label: targetDomain, data: { color: "#afafaf" } });
          this.nodesSet.add(targetDomain);
        }
      }
    }
  }

}
