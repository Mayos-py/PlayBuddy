import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PlaybuddyproxyService = class PlaybuddyproxyService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.hostUrl = 'http://localhost:8080/';
    }
    getFilteredClubs(zipCode, sportName) {
        return this.httpClient.get(this.hostUrl + `app/club/zipcode/${zipCode}/sport/${sportName}`);
    }
    getFilteredPlayerRequests(zipCode, sportName) {
        return this.httpClient.get(this.hostUrl + `app/playerrequest/zipcode/${zipCode}/sport/${sportName}`);
    }
    getSpecificSportsInfo(sportName) {
        return this.httpClient.get(this.hostUrl + `app/hub/sport/${sportName}`);
    }
    addPlayerRequest(formData) {
        return this.httpClient.post(this.hostUrl + `app/playerrequest`, formData);
    }
};
PlaybuddyproxyService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PlaybuddyproxyService);
export { PlaybuddyproxyService };
//# sourceMappingURL=playbuddyproxy.service.js.map