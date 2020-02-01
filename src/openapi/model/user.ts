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


export interface User { 
    email: string;
    displayName: string;
    photoURL: string;
    uid: string;
    role?: User.RoleEnum;
}
export namespace User {
    export type RoleEnum = 'admin' | 'quanlykho' | 'kiemhang' | 'donghang' | 'CTVban' | 'quanlyCTVban' | 'CTVmua' | 'quanlyCTVmua' | 'nguoimoi';
    export const RoleEnum = {
        Admin: 'admin' as RoleEnum,
        Quanlykho: 'quanlykho' as RoleEnum,
        Kiemhang: 'kiemhang' as RoleEnum,
        Donghang: 'donghang' as RoleEnum,
        CTVban: 'CTVban' as RoleEnum,
        QuanlyCTVban: 'quanlyCTVban' as RoleEnum,
        CTVmua: 'CTVmua' as RoleEnum,
        QuanlyCTVmua: 'quanlyCTVmua' as RoleEnum,
        Nguoimoi: 'nguoimoi' as RoleEnum
    };
}

