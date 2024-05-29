import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/datastore.service';
import { PartyDetails } from '../models/partyDetails.model';

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.component.html',
  styleUrls: ['./party-details.component.css'],
})
export class PartyDetailsComponent implements OnInit {
  parties: any = [];

  constructor(private dataStoreService: DatastoreService) { };

  ngOnInit(): void {
    this.dataStoreService.partyDetailsSubject.subscribe((partydetails: PartyDetails[]) => {
      this.parties = partydetails;
      console.log(this.parties)
    })

    this.parties = this.dataStoreService.getPartyDetails();
  }

}
