import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybuddyproxyService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getFilteredClubs(zipCode: number | null, sportName: string | null) {
    return this.httpClient.get<any[]>( this.hostUrl + `app/club/zipcode/${zipCode}/sport/${sportName}`);
  }
  getFilteredPlayerRequests(zipCode: number | null, sportName: string | null){
    return this.httpClient.get<any[]>( this.hostUrl + `app/playerrequest/zipcode/${zipCode}/sport/${sportName}`);
  }
  getAllSportsInfo(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.hostUrl + 'app/hub/sport/Badminton');
  }

}
