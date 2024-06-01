import { WebsiteRecord } from "../website-record/website-record";

export class WebsiteCrawlExecutionPlan 
{
    public id: number;
    public websiteRecordId: number;
    public date: Date;
    public state: 'Pending' | 'Running' | 'Completed' | 'Failed';
    public websiteRecord: WebsiteRecord;
    public finishedDate: Date | undefined;
    public numberOfCrawledPages: number | undefined;

    constructor(id: number, 
        websiteRecordId: number, 
        date: Date, state: 'Pending' | 'Running' | 'Completed' | 'Failed', 
        websiteRecord: WebsiteRecord,
        finishedDate?: Date,
        numberOfCrawledPages?: number)
    {
        this.id = id;
        this.websiteRecordId = websiteRecordId;
        this.date = date;
        this.state = state;
        this.websiteRecord = websiteRecord;
        this.finishedDate = finishedDate;
        this.numberOfCrawledPages = numberOfCrawledPages;
    }
}
