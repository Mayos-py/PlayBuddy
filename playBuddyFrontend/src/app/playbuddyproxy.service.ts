import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaybuddyproxyService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getFilteredClubs(zipCode: number | null, sportName: string | null) {
    return this.httpClient.get<any[]>( this.hostUrl + `app/club/zipcode/${zipCode}/sport/${sportName}`);
  }

}
