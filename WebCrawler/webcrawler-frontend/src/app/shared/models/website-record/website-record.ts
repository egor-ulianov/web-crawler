import { Tag } from "../tag/tag";

export class WebsiteRecord 
{
    public id: number | null;
    public url: string;
    public label: string;
    public isActive: boolean;
    public boundaryRegExp: string;
    public periodicity: number;
    public tags: Array<Tag>;

    constructor(id: number | null, url: string, 
        label: string, isActive: boolean, 
        boundaryRegExp: string, periodicity: number, 
        tags: Array<Tag>)
    {
        this.id = id;
        this.url = url;
        this.label = label;
        this.isActive = isActive;
        this.boundaryRegExp = boundaryRegExp;
        this.periodicity = periodicity;
        this.tags = tags;
    }
}
