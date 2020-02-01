/**
 * Gom Don API
 * Gom Don API.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { Responses } from '../model/responses';
import { Sell } from '../model/sell';
import { SellPaidCheck } from '../model/sellPaidCheck';
import { UpdateSell } from '../model/updateSell';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class SellService {

    protected basePath = 'https://us-central1-gomdon-74d1a.cloudfunctions.net';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * create sells
     * create sells
     * @param Sell 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSell(Sell: Array<Sell>, observe?: 'body', reportProgress?: boolean): Observable<Array<object>>;
    public createSell(Sell: Array<Sell>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<object>>>;
    public createSell(Sell: Array<Sell>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<object>>>;
    public createSell(Sell: Array<Sell>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (Sell === null || Sell === undefined) {
            throw new Error('Required parameter Sell was null or undefined when calling createSell.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Array<object>>(`${this.configuration.basePath}/sell/create`,
            Sell,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get sell by array id
     * get sell by array id
     * @param ids 
     * @param fields 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdsSell(ids: Array<string>, fields?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<Array<object>>;
    public getByIdsSell(ids: Array<string>, fields?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<object>>>;
    public getByIdsSell(ids: Array<string>, fields?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<object>>>;
    public getByIdsSell(ids: Array<string>, fields?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (ids === null || ids === undefined) {
            throw new Error('Required parameter ids was null or undefined when calling getByIdsSell.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (ids) {
            queryParameters = queryParameters.set('ids', ids.join(COLLECTION_FORMATS['csv']));
        }
        if (fields) {
            queryParameters = queryParameters.set('fields', fields.join(COLLECTION_FORMATS['csv']));
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<object>>(`${this.configuration.basePath}/sell/get-by-ids`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get sell by shop_id and status
     * get sell by shop_id and status
     * @param status 
     * @param shop_id 
     * @param field 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByStatus(status: Array<number>, shop_id: number, field?: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getByStatus(status: Array<number>, shop_id: number, field?: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getByStatus(status: Array<number>, shop_id: number, field?: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getByStatus(status: Array<number>, shop_id: number, field?: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (status === null || status === undefined) {
            throw new Error('Required parameter status was null or undefined when calling getByStatus.');
        }
        if (shop_id === null || shop_id === undefined) {
            throw new Error('Required parameter shop_id was null or undefined when calling getByStatus.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (status) {
            queryParameters = queryParameters.set('status', status.join(COLLECTION_FORMATS['csv']));
        }
        if (shop_id !== undefined && shop_id !== null) {
            queryParameters = queryParameters.set('shop_id', <any>shop_id);
        }
        if (field) {
            queryParameters = queryParameters.set('field', field.join(COLLECTION_FORMATS['csv']));
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/sell/get-by-status`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Đối soát
     * Đối soát đơn bán với shopee
     * @param SellPaidCheck 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public paymentCheckSell(SellPaidCheck: Array<SellPaidCheck>, observe?: 'body', reportProgress?: boolean): Observable<Array<object>>;
    public paymentCheckSell(SellPaidCheck: Array<SellPaidCheck>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<object>>>;
    public paymentCheckSell(SellPaidCheck: Array<SellPaidCheck>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<object>>>;
    public paymentCheckSell(SellPaidCheck: Array<SellPaidCheck>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (SellPaidCheck === null || SellPaidCheck === undefined) {
            throw new Error('Required parameter SellPaidCheck was null or undefined when calling paymentCheckSell.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<Array<object>>(`${this.configuration.basePath}/sell/reconciliation`,
            SellPaidCheck,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * update sell
     * update sell
     * @param UpdateSell 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSell(UpdateSell: Array<UpdateSell>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateSell(UpdateSell: Array<UpdateSell>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateSell(UpdateSell: Array<UpdateSell>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateSell(UpdateSell: Array<UpdateSell>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (UpdateSell === null || UpdateSell === undefined) {
            throw new Error('Required parameter UpdateSell was null or undefined when calling updateSell.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/sell/update`,
            UpdateSell,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}