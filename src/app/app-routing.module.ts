import { RouterModule, Routes } from "@angular/router";
import { CreatePartyComponent } from "./main/create-party/create-party.component";
import { NgModule } from "@angular/core";
import { PartyDetailsComponent } from "./main/party-details/party-details.component";
import { HomepageComponent } from "./main/homepage/homepage.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: CreatePartyComponent,

    },
    {
        path: 'party',
        component: PartyDetailsComponent,
    },
    {
        path: 'party/:id/edit',
        component: CreatePartyComponent
    },
    {
        path: 'party/:id/delete',
        component: CreatePartyComponent
    }
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }