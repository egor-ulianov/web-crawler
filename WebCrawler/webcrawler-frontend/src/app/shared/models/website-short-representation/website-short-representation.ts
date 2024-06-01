export class WebsiteShortRepresentation 
{
    public siteId: number;

    public isActive: boolean;

    public label: string;

    public url: string;

    public periodicity: number;

    public nextExecutionDate: Date;

    public tags: string[];

    public date: Date;

    public state: string;

    constructor(siteId: number, isActive: boolean, label: string, url: string, periodicity: number, nextExecutionDate: Date, tags: string[], date: Date, state: string)
    {
        this.siteId = siteId;
        this.isActive = isActive;
        this.label = label;
        this.url = url;
        this.periodicity = periodicity;
        this.nextExecutionDate = nextExecutionDate;
        this.tags = tags;
        this.date = date;
        this.state = state;
    }

}
