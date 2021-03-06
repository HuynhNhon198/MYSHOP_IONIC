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
import { GomdonLogs } from './gomdonLogs';


export interface ExportSell { 
    gomdon_logs?: Array<GomdonLogs>;
    gomdon_ctime?: number;
    gomdon_sells?: Array<string | object>;
    gomdon_status?: number;
    /**
     * id của document để quản lý
     */
    gomdon_id?: string;
}

