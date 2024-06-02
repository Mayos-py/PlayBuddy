import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaybuddyproxyService {

  // hostUrl:string = 'http://localhost:8080/';
  hostUrl:string = '';

  constructor(private httpClient: HttpClient) { }

  getFilteredClubs(zipCode: number | null, sportName: string | null) {
    return this.httpClient.get<any[]>( this.hostUrl + `app/club/zipcode/${zipCode}/sport/${sportName}`);
  }
  getFilteredPlayerRequests(zipCode: number | null, sportName: string | null){
    return this.httpClient.get<any[]>( this.hostUrl + `app/playerrequest/zipcode/${zipCode}/sport/${sportName}`);
  }
  getSpecificSportsInfo(sportName: string | null){
    return this.httpClient.get<any[]>(this.hostUrl + `app/hub/sport/${sportName}`);
  }
  addPlayerRequest(formData: JSON){
    return this.httpClient.post<any[]>(this.hostUrl + `app/playerrequest`, formData);
  }
  getUserInfo(){
    return this.httpClient.get<any>(this.hostUrl + `app/user/info`);
  }
  

}
