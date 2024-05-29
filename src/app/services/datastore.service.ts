import { Injectable } from "@angular/core";
import { PartyDetails } from "../main/models/partyDetails.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DatastoreService {
    partyDetailsSubject = new Subject<PartyDetails[]>();
    private partyDetails: PartyDetails[] = [
        {
            "id": "83647382719",
            "fullName": "Mayuresh Takawane",
            "address": "Flat C206, Sundamr, solpur road manjri bk, pune-412307",
            "mobileNo": "9876543210",
            "date": "2024-05-30",
            "time": "10:00"
        },
        {
            "id": "93497382726",
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
        this.partyDetails.push({...partyDetails});
        this.partyDetailsSubject.next(this.partyDetails);
        return true
    }

    updatePartyDetails() {

    }

    deletePartyDetails() {

    }

    getPartyDetailById() {

    }

}