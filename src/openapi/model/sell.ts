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
import { BuyerUser } from './buyerUser';
import { DropshippingInfo } from './dropshippingInfo';
import { OrderItem } from './orderItem';
import { CardTxnFeeInfo } from './cardTxnFeeInfo';
import { GomdonLogs } from './gomdonLogs';
import { SellerAddress } from './sellerAddress';
import { SellGomdonBy } from './sellGomdonBy';


export interface Sell { 
    /**
     * Id của document
     */
    gomdon_id?: string;
    gomdon_ctime?: number;
    gomdon_note?: string;
    gomdon_status?: number;
    gomdon_logs?: Array<GomdonLogs>;
    gomdon_snapshots?: Array<string>;
    /**
     * link đến gomdon_id của phiếu xuất
     */
    gomdon_export_id?: string;
    gomdon_by?: SellGomdonBy;
    gomdon_ecom_paid?: number;
    shipping_method?: number;
    payment_method?: number;
    wallet_discount?: string;
    shop_id: number;
    add_on_deal_id?: number;
    buyer_address_name: string;
    seller_due_date?: number;
    complete_time?: number;
    actual_shipping_fee?: string;
    ship_by_date?: number;
    return_id?: number;
    checkout_id?: number;
    voucher_code?: string;
    rate_comment?: string;
    total_price?: string;
    tax_amount?: string;
    first_item_is_wholesale?: boolean;
    is_buyercancel_toship?: boolean;
    list_type?: number;
    first_item_count?: number;
    shipping_confirm_time?: number;
    payby_date?: number;
    seller_service_fee?: string;
    status_ext?: number;
    pay_by_credit_card?: boolean;
    first_item_return?: boolean;
    logistics_status?: number;
    create_time?: number;
    auto_cancel_3pl_ack_date?: number;
    price_before_discount?: string;
    order_ratable?: boolean;
    coins_cash_by_voucher?: string;
    item_count?: number;
    shipment_config?: boolean;
    logistics_channel?: number;
    coin_used?: number;
    origin_shipping_fee?: string;
    actual_price: string;
    order_id: number;
    pickup_time?: number;
    voucher_price?: string;
    trans_detail_shipping_fee?: string;
    buyer_is_rated?: number;
    express_channel?: number;
    logistics_extra_data?: string;
    dropshipping_info?: DropshippingInfo;
    remark?: string;
    buyer_txn_fee?: string;
    cancel_reason_ext?: number;
    coin_offset?: string;
    shipping_proof_status?: number;
    buyer_address_phone: string;
    cancellation_end_date?: number;
    buyer_paid_amount: string;
    ratecancel_by_date?: number;
    first_item_model?: string;
    buyer_user: BuyerUser;
    estimated_shipping_rebate?: string;
    instant_buyercancel_toship?: boolean;
    auto_cancel_arrange_ship_date?: number;
    is_request_cancellation?: boolean;
    order_sn: string;
    note_mtime?: number;
    note?: string;
    delivery_time?: number;
    pickup_attempts?: number;
    seller_userid?: number;
    logistics_flag?: number;
    voucher_absorbed_by_seller?: boolean;
    shipping_address: string;
    shipping_fee: string;
    rate_star?: number;
    shipping_traceno: string;
    pickup_cutoff_time?: number;
    buyer_last_change_address_time?: number;
    currency?: string;
    escrow_release_time?: number;
    shipping_proof?: string;
    logid?: number;
    order_type?: number;
    paid_amount?: string;
    credit_card_promotion_discount?: string;
    carrier_shipping_fee?: number;
    rate_by_date?: number;
    credit_card_number?: string;
    shipping_fee_discount?: number;
    card_txn_fee_info?: CardTxnFeeInfo;
    status?: number;
    first_item_name?: string;
    buyer_cancel_reason?: number;
    order_items: Array<OrderItem>;
    actual_carrier: string;
    shipping_rebate?: string;
    used_voucher?: number;
    seller_address_id?: number;
    cancel_userid?: number;
    user_id?: number;
    seller_address?: SellerAddress;
    coins_by_voucher?: number;
    arrange_pickup_by_date?: number;
    pay_by_wallet?: boolean;
    comm_fee?: string;
}

