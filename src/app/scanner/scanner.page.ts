import { SellService } from "src/openapi";
import { FirebaseService } from "src/app/services/firebase.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.page.html",
  styleUrls: ["./scanner.page.scss"],
})
export class ScannerPage implements OnInit {
  typeScan = "ScanReturnOrder";
  list: {
    id: string;
    mvd: string;
    status: string;
  }[] = [];
  @ViewChild("scanner", { static: true }) scanner: ZXingScannerComponent;
  current: string;
  constructor(private fsSV: FirebaseService, private sellSV: SellService) {}

  ngOnInit(): void {}

  async getResult(e: string) {
    if (e && e !== this.current) {
      this.current = e;
      if (this.typeScan === "ScanReturnOrder") {
        const mvd = e.trim();
        if (mvd.length > 0) {
          this.sellSV.getByIdsSell([mvd]).subscribe(async (res: any[]) => {
            const sell = res[0];
            console.log(sell);

            const addList = (id: string, status: string) => {
              this.list = [
                {
                  id,
                  status,
                  mvd,
                },
                ...this.list,
              ];
              console.log(this.list);
            };

            if (
              sell.code === "error" &&
              sell.data.message === "đơn không tồn tại"
            ) {
              addList(undefined, "Không tồn tại");
            } else if (sell.code === "success") {
              // if (this.task === 1) {
              const status = sell.data.gomdon_status;
              switch (true) {
                case status < 5:
                  addList(sell.data.order_sn, "Chưa gửi đi");
                  break;
                case status === 5 || status === 6:
                  this.sellSV
                    .updateSell([
                      {
                        id: sell.data.order_sn,
                        data: {
                          gomdon_status: 8,
                        },
                      },
                    ])
                    .subscribe(async (res1) => {
                      if (res1[0].code === "success") {
                        addList(sell.data.order_sn, "Đã hoàn");
                      }
                    });
                  break;
                case status === 8:
                  addList(sell.data.order_sn, "Đã hoàn");
                  break;
              }
              // }
            }
            // this.loading = false;
          });
        } else {
        }
      }
    }
  }
}
