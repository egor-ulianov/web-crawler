import { PagedRequestBase } from "../paged-request-base/paged-request-base";

export class WebSitesExecutionsPagedRequest extends PagedRequestBase {
    public siteId: number | undefined;

    constructor(pageNumber: number, pageSize: number, siteId?: number) {
        super(pageNumber, pageSize);
        this.siteId = siteId;
    }
}
