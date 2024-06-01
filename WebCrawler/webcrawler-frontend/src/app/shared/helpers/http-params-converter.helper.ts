import { HttpParams } from "@angular/common/http";
import { SearchEncoder } from "./search-encoder";

export class HttpParamsConverter 
{
    public static convert<T>(queryParams: T): HttpParams
    {
        let params = new HttpParams({ encoder: new SearchEncoder() });

        Object.keys(queryParams as object).forEach((key: string) => 
        {
            if (queryParams[key as keyof T] !== null && queryParams[key as keyof T] !== undefined) 
            {
                if (queryParams[key as keyof T] instanceof Array) 
                {
                    (queryParams[key as keyof T] as Array<any>).forEach((item: any) => 
                    {
                        params = params.append(key, item);
                    });
                } 
                else
                    params = params.append(key, queryParams[key as keyof T] as any);
            }
        });

        return params;
    }
}