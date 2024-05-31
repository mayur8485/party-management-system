import { Injectable } from "@angular/core";
import { PartyDetails } from "../models/partyDetails.model";
import { Subject } from "rxjs";

import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class DatastoreService {
    partyDetailsSubject = new Subject<PartyDetails[]>();
    private partyDetails: any = [];

    constructor(private http: HttpClient, private authService: AuthService) { }


    fetchParties() {
        // console.log("Fecthing from their website");
        this.http.request('get', 'https://ap.greatfuturetechno.com/party/').subscribe({
            next: (response) => {
                this.partyDetails = response;
                this.partyDetailsSubject.next(this.partyDetails);
            },
            error: (error) => {
                this.handleError(error);
            }
        });
    }

    getPartyDetails() {
        if (this.partyDetails.length === 0) this.fetchParties();
        return [...this.partyDetails];
    }

    getPartyDetailsById(id: any) {
        this.http.request('get', 'https://ap.greatfuturetechno.com/party/', { params: new HttpParams().set('id', id) }).subscribe(
            {
                next:
                    (response) => {
                        this.partyDetails = [response];
                        this.partyDetailsSubject.next(this.partyDetails);
                    },
                error: (error) => {
                    this.handleError(error);
                }
            }
        );
    }

    createPartyDetails(partyDetails: any) {
        const formData = this.createFormData(partyDetails);
        this.http.request('post', 'https://ap.greatfuturetechno.com/party/', { body: formData }).subscribe(
            {
                next:
                    (response) => {
                        this.fetchParties();
                    },
                error: (error) => {
                    this.handleError(error);
                }
            }
        );
        return true
    }

    deletePartyById(id: any) {
        this.http.request('delete', 'https://ap.greatfuturetechno.com/party/', { params: new HttpParams().set('id', id) }).subscribe(
            {
                next:
                    (response) => {
                        this.fetchParties();
                    },
                error: (error) => {
                    this.handleError(error);
                }
            }
        );
    }

    private createFormData(body: any) {
        const formData = new FormData();
        Object.keys(body).forEach((eachKey: any) => {
            if (eachKey === 'image') {
            }
            else if (Array.isArray(body[eachKey]) || typeof body[eachKey] === 'object') {
                formData.append(eachKey, JSON.stringify(body[eachKey]));
            } else {
                formData.append(eachKey, body[eachKey]);
            }
        })
        return formData;
    }

    putValue(body: any, id: any) {
        const formData = this.createFormData(body);
        this.http.request('put', 'https://ap.greatfuturetechno.com/party/', { body: formData, params: new HttpParams().set('id', id) }).subscribe(
            {
                next:
                    (response) => {
                        this.fetchParties();
                    },
                error: (error) => {
                    this.handleError(error);
                }
            }
        );
    }

    patchValue(body: any, id: any) {
        const formData = this.createFormData(body);
        this.http.request('patch', 'https://ap.greatfuturetechno.com/party/', { body: formData, params: new HttpParams().set('id', +id) }).subscribe(
            {
                next:
                    (response) => {
                        this.fetchParties();
                    },
                error: (error) => {
                    this.handleError(error);
                }
            }
        );
    }

    getPartyDetailById(id: string) {
        return this.partyDetails.filter((x: any) => x.id == id);
    }

    search(value: string) {
        const filteredData = this.partyDetails.filter((x: any) => Object.values(x).join(";").toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        this.partyDetailsSubject.next(filteredData);
    }

    private handleError(errorRes: HttpErrorResponse) {
        if (errorRes.error.detail === "Invalid token.") {
            this.authService.clearLocalStorage();
        }
    }

}