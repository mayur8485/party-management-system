import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatastoreService } from 'src/app/services/datastore.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css']
})
export class CreatePartyComponent implements OnInit, OnDestroy {

  partyForm: any;
  mode: string = 'create';
  routeSubs!: Subscription;

  constructor(private datastoreService: DatastoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.partyForm = new FormGroup({
      id: new FormControl(""),
      name: new FormControl(""),
      company_name: new FormControl("", {validators: [Validators.required]}),
      mobile_no: new FormControl("" ,{validators: [Validators.required]}),
      telephone_no: new FormControl(""),
      whatsapp_no: new FormControl(""),
      email: new FormControl(""),
      remark: new FormControl(""),
      date_of_birth: new FormControl("",{validators: [Validators.required]}),
      anniversary_date: new FormControl("",{validators: [Validators.required]}),
      gstin: new FormControl("",{validators: [Validators.required]}),
      pan_no: new FormControl(""),
      login_access: new FormControl("",{validators: [Validators.required]}),
      apply_tds: new FormControl("",{validators: [Validators.required]}),
      credit_limit: new FormControl("",{validators: [Validators.required]}),
      is_active: new FormControl(""),
      image: new FormControl(),
      bank_id: new FormArray([]),
      address: new FormArray([]),
      userid: new FormGroup({
        id: new FormControl(""),
        username: new FormControl(""),
        phone_number: new FormControl(""),
        is_active: new FormControl(""),
      })
    })

    this.routeSubs = this.route.params.subscribe((params: Params) => {
      this.mode = this.checkModes(this.router.url);
      this.openFormInModes(params['id']);
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const formData = new FormData()
    formData.append('image',file);
    if (file) {
      this.partyForm.patchValue({
        image: reader
      });
      this.partyForm.get('image')!.updateValueAndValidity();
    }
  }

  checkModes(url: string) {
    if (url.includes('edit')) return 'edit';
    else if (url.includes('delete')) return 'delete';
    return 'create';
  }

  openFormInModes(id: string) {
    const partydetails = this.datastoreService.getPartyDetailById(id);
    this.partyForm.patchValue(partydetails[0]);

    if (partydetails[0]?.bank_id) {
      partydetails[0].bank_id.forEach((element: any) => {
        const formGrp = this.getBankFormGroup();
        formGrp.patchValue(element);
        this.partyForm.get("bank_id").push(formGrp);
      });
    }

    if (partydetails[0]?.address) {
      partydetails[0].address.forEach((element: any) => {
        const formGrp = this.getAddressFormGroup();
        formGrp.patchValue(element);
        this.partyForm.get("address").push(formGrp);
      });
    }
  }

  addBankForm() {
    this.partyForm.get("bank_id").push(this.getBankFormGroup());
  }

  removeBankForm() {
    this.partyForm.get("bank_id").controls.pop();
  }

  getBankFormGroup() {
    const bankGroup = new FormGroup({
      id: new FormControl(""),
      bank_ifsc_code: new FormControl(""),
      bank_name: new FormControl(""),
      branch_name: new FormControl(""),
      account_no: new FormControl(""),
      account_holder_name: new FormControl(""),
      is_active: new FormControl(true)
    });
    return bankGroup
  }

  addAddressForm() {
    this.partyForm.get("address").push(this.getAddressFormGroup());
  }

  removeAddressForm() {
    this.partyForm.get("address").controls.pop();
  }

  getAddressFormGroup() {
    const address = new FormGroup({
      id: new FormControl(""),
      address_line_1: new FormControl(""),
      address_line_2: new FormControl(""),
      country: new FormControl(""),
      state: new FormControl(""),
      city: new FormControl(""),
      pincode: new FormControl(""),
      is_active: new FormControl(true)
    });
    return address
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100).toString();
  }

  onCreatePartyDetails() {
    if (this.partyForm.valid) {
      const partyDetail = this.partyForm.getRawValue();
      partyDetail.id = this.getRandomNumber();
      if (this.datastoreService.createPartyDetails(partyDetail)) {
        this.partyForm.reset();
        this.router.navigate(['/party']);
      }
    }
  }

  onUpdatePartyDetails() {
    // console.log('Updating the party details');
    if (this.partyForm.dirty) {
      const partyDetail = this.partyForm.getRawValue();
      this.datastoreService.putValue(partyDetail, +partyDetail['id']);
      this.router.navigate(['/party']);
    }
  }

  onDeletePartyDetails() {
    // console.log('Deleting the party details');
    const partyDetail = this.partyForm.getRawValue();
    this.datastoreService.deletePartyById(+partyDetail["id"]);
    this.router.navigate(['/party']);
  }

  onNavigate() {
    this.router.navigate(['/party']);
  }


  getControls(name: string) { // a getter!
    return (<FormArray>this.partyForm.get(name)).controls;
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }

}
