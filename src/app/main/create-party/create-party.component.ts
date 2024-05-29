import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from 'src/app/services/datastore.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit {

  partyForm: any;

  constructor(private datastoreService: DatastoreService) { }

  ngOnInit(): void {
    this.partyForm = new FormGroup({
      fullName: new FormControl("", { validators: [Validators.required] }),
      address: new FormControl("", { validators: [Validators.required] }),
      mobileNo: new FormControl("", { validators: [Validators.required] }),
      date: new FormControl("", { validators: [Validators.required] }),
      time: new FormControl("", { validators: [Validators.required] })
    })
  }


  onSavePartyDetails() {
    if (this.partyForm.valid) {
      const partyDetails = this.partyForm.getRawValue();
      if (this.datastoreService.createPartyDetails(partyDetails)) {
        this.partyForm.reset();
      }
    }
  }
}
