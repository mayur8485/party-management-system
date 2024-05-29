import { Injectable } from "@angular/core";
import { PartyDetails } from "../models/partyDetails.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DatastoreService {
    partyDetailsSubject = new Subject<PartyDetails[]>();
    private partyDetails: PartyDetails[] = [
        {
            "id": "8364738271",
            "fullName": "Mayuresh Takawane",
            "address": "Flat C206, Sundamr, solpur road manjri bk, pune-412307",
            "mobileNo": "9876543210",
            "date": "2024-05-30",
            "time": "10:00"
        },
        {
            "id": "9349738276",
            "fullName": "Mayuresh Takawane",
            "address": "Flat C206, Sundamr, solpur road manjri bk, pune-412307",
            "mobileNo": "9876543210",
            "date": "2024-05-30",
            "time": "10:00"
        }
    ]

    getPartyDetails() {
        return [...this.partyDetails];
    }

    createPartyDetails(partyDetails: PartyDetails) {
        this.partyDetails.push({ ...partyDetails });
        this.partyDetailsSubject.next(this.partyDetails);
        return true
    }

    updatePartyDetails(partyDetail: PartyDetails) {
        this.partyDetails = this.partyDetails.filter((x: any) => x.id !== partyDetail.id);
        this.partyDetails.push(partyDetail);
        this.partyDetailsSubject.next(this.partyDetails);
    }

    deletePartyDetails(partyDetail: PartyDetails) {
        this.partyDetails = this.partyDetails.filter((x: any) => x.id !== partyDetail.id);
        this.partyDetailsSubject.next(this.partyDetails);
    }

    getPartyDetailById(id: string) {
        return this.partyDetails.filter(x => x.id === id);
    }

}