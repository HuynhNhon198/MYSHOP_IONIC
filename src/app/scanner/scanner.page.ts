import { ModalController, ToastController } from "@ionic/angular";
import { SellService } from "src/openapi";
import { FirebaseService } from "src/app/services/firebase.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { DetailOrderPage } from "../orders/detail-order/detail-order.page";

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
  constructor(
    private fbSV: FirebaseService,
    private sellSV: SellService,
    private modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit(): void {}

  async getResult(e: string) {
    if (e && e !== this.current) {
      this.current = e;

      let mvd = e.trim();
      if (mvd.length > 0) {
        this.playSound("beep");
        // mvd = "VN019569203525";
        this.sellSV.configuration.accessToken = await this.fbSV.getToken();
        this.sellSV.getByIdsSell([mvd]).subscribe(
          async (res: any[]) => {
            const data = res[0];
            const sell = data.data;
            console.log(sell);

            if (
              sell &&
              sell.shipping_traceno &&
              sell.shipping_traceno.length >= 0
            ) {
              if (this.typeScan === "ScanReturnOrder") {
                const addList = async (id: string, status: string) => {
                  this.list = [
                    {
                      id,
                      status,
                      mvd,
                    },
                    ...this.list,
                  ];

                  // const toast = await this.toastController.create({
                  //   message: `${mvd} - ${status}`,
                  //   duration: 3000,

                  // });
                  // toast.present();
                };

                if (
                  data.code === "error" &&
                  data.data.message === "đơn không tồn tại"
                ) {
                  this.playSound("notfound");
                  addList(undefined, "Không tồn tại");
                } else if (data.code === "success") {
                  // if (this.task === 1) {
                  const status = sell.gomdon_status;
                  switch (true) {
                    case status < 5:
                      this.playSound("chuaguidi");
                      addList(sell.order_sn, "Chưa gửi đi");
                      break;
                    case status === 5 || status === 6:
                      this.sellSV
                        .updateSell([
                          {
                            id: sell.order_sn,
                            data: {
                              gomdon_status: 8,
                            },
                          },
                        ])
                        .subscribe(async (res1) => {
                          if (res1[0].code === "success") {
                            this.playSound("hoan");
                            addList(sell.order_sn, "Đã hoàn");
                          }
                        });
                      break;
                    case status === 8:
                      this.playSound("dahoan");
                      addList(sell.order_sn, "Đã hoàn");
                      break;
                  }
                  // }
                }
              } else {
                const modal = await this.modalController.create({
                  component: DetailOrderPage,
                  componentProps: {
                    data: sell,
                  },
                });
                await modal.present();
              }
            } else {
              alert(`Đơn hàng ${e} không tồn tại`);
            }

            // this.loading = false;
          },
          (err) => {
            console.error(err);
            alert("Có Lỗi Xaỷ ra");
          }
        );
      } else {
      }
    }
  }

  playSound(sound: string) {
    sound = "assets/audio/" + sound + ".mp3";
    // tslint:disable-next-line: no-unused-expression
    const audio = new Audio();
    audio.src = sound;
    audio.load();
    audio.play();
  }
}
