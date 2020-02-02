import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GomdonLogs } from 'src/openapi';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  sellStatus = [
    {
      id: 0,
      english: 'DRAFT',
      vietnamese: 'đơn nháp'
    },
    {
      id: 1,
      english: 'NEW',
      vietnamese: 'đơn mới'
    },
    {
      id: 2,
      english: 'PREPARED',
      vietnamese: 'đã nhặt đủ hàng để chờ đóng gói'
    },
    {
      id: 3,
      english: 'UNPREPARED',
      vietnamese:
        'chưa nhặt được hàng vì lý do nào đó (ghi lý do vào noteWarehouse)'
    },
    {
      id: 4,
      english: 'PACKED',
      vietnamese: 'đã đóng gói'
    },
    {
      id: 5,
      english: 'SHIPPED',
      vietnamese: 'đã gửi đi'
    },
    {
      id: 6,
      english: 'DELIVERED',
      vietnamese: 'khách đã nhận'
    },
    {
      id: 7,
      english: 'RETURNING',
      vietnamese: 'đang hoàn hàng'
    },
    {
      id: 8,
      english: 'RETURNED',
      vietnamese: 'đã hoàn'
    },
    {
      id: 9,
      english: 'PAID',
      vietnamese: 'đã thanh toán'
    },
    {
      id: 10,
      english: 'REFUNDED',
      vietnamese: 'đã hoàn tiền'
    },
    {
      id: 11,
      english: 'CANCELED',
      vietnamese: 'đã hủy'
    }
  ];

  constructor(
    public loadingController: LoadingController,
    private fbSV: FirebaseService
  ) {
  }

  async showLoading(hide?: boolean) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    hide ? loading.dismiss() : loading.present();
  }

  sortArrObj(arr: any[], prop: string, type: string) {
    if (type.toLowerCase() === 'asc') {
      return arr.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
    } else {
      return arr.sort((a, b) => (a[prop] < b[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0));
    }
  }

  sum(items: any[], prop: string): number {
    return items.reduce((a, b) => {
      if (b[prop]) {
        return Number(a) + Number(b[prop]);
      } else {
        return 0;
      }
    }, 0);
  }

  saveLogOrder(logs: GomdonLogs[], content: string, type: number): Promise<GomdonLogs[]> {
    return new Promise(r => {
      this.fbSV.user.subscribe(user => {
        logs.push({
          content,
          id: (new Date()).getTime(),
          name: user.displayName,
          type,
          uid: user.uid
        });
        r(logs);
      });
    });
  }
}
