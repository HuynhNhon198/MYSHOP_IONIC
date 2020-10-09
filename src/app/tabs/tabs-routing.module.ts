import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import {
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AngularFireAuthGuard,
} from "@angular/fire/auth-guard";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["profile"]);
const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "profile",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../profile/profile.module").then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: "picks",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../picks/picks.module").then((m) => m.PicksPageModule),
          },
        ],
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../orders/orders.module").then((m) => m.OrdersPageModule),
          },
        ],
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: "chats",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../chats/chats.module").then((m) => m.ChatsPageModule),
          },
        ],
      },
      {
        path: "scanner",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../scanner/scanner.module").then(
                (m) => m.ScannerPageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/profile",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/profile",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
