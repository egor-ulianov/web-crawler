export class CrawlRecordsRequest {
    
    public sourceIds: Array<number>;

    public constructor(sourceIds: Array<number>)
    {
        this.sourceIds = sourceIds;
    }
    
}
