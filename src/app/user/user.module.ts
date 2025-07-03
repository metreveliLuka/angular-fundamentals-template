import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from "./services/user.service";
import { UserStoreService } from "./services/user-store.service";
import { AdminGuard } from "./guards/admin.guard";
import { WINDOW } from '@app/auth/services/session-storage.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        UserService,
        UserStoreService,
        AdminGuard,
        {provide: WINDOW, useValue: window}
    ]
})
export class UserModule { }
