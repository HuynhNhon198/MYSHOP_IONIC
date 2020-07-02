import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GomdonLogs } from 'src/openapi';
import { FirebaseService } from './firebase.service';
import { Storage } from '@ionic/storage';

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

  roleSchema = [
    {
      id: 0,
      code: 'nguoimoi',
      name: 'Người mới'
    },
    {
      id: 1,
      code: 'admin',
      name: 'ADMIN'
    },
    {
      id: 4,
      code: 'quanlykho',
      name: 'Quản lý kho'
    },
    {
      id: 7,
      code: 'nhathang',
      name: 'Người Nhặt hàng'
    },
    {
      id: 9,
      code: 'donghang',
      name: 'Người đóng gói'
    },
    {
      id: 12,
      code: 'CTVban',
      name: 'Cộng tác viên bán'
    },
    {
      id: 14,
      code: 'quanlyCTVban',
      name: 'Quản lý CTV bán'
    },
    {
      id: 16,
      code: 'CTVmua',
      name: 'Cộng tác viên mua'
    },
    {
      id: 18,
      code: 'quanlyCTVmua',
      name: 'Quản lý CTV mua'
    }
  ];

  constructor(
    public loadingController: LoadingController,
    private fbSV: FirebaseService,
    private storage: Storage
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

  uniqueArrObj(arr: any[], prop: string) {
    const unique = [];
    for (const item of arr) {
      const ind = unique.findIndex(x => x[prop] === item[prop]);
      if (ind === -1) {
        unique.push(item);
      }
    }
    return unique;
  }

  saveLogOrder(logs: GomdonLogs[], content: string, type: number): GomdonLogs[] {
    const user = this.fbSV.getUser();
    logs.push({
      content,
      id: (new Date()).getTime(),
      name: user.displayName,
      type,
      uid: user.uid
    });
    return logs;
  }

  async setStorage(key: string, data: any) {
    await this.storage.set(key, data);
  }

  async getStorage(key: string) {
    return await this.storage.get(key);
  }
}
