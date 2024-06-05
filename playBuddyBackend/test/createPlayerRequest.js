process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

var http = require('http');
chai.use(chaiHttp);

describe('Test Create Player Request', function () {

    var response;
    var requestBody = {
        userName: 'testUser',
        playerNeeded: 2,
        zipCode: '12345',
        date: '2024-06-03',
        time: '18:00',
        joined: 0,
        sportName: 'Soccer',
        ssoID: '123'
    };

    var createdRequestId;

    before(function (done) {
        chai.request("https://play-buddies.azurewebsites.net")
            .post("/app/playerrequest")
            .send(requestBody)
            .end(function (err, res) {
                response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                createdRequestId = res.body.reqId;
                done();
            });
    });

    it('Should return the status code 200', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
    });

    it('The entry in the array has known properties', function(){
	    expect(response.body).to.include.keys('userName');
	    expect(response.body).to.have.property('playerNeeded');
		expect(response.body).to.not.be.a.string;
	});

    it('Should create a player request and return the created object', function () {
        expect(response).to.have.status(200);
        expect(response.body).to.include.keys('reqId');
        expect(response.body.userName).to.equal(requestBody.userName);
        expect(response.body.playerNeeded).to.equal(requestBody.playerNeeded);
        expect(response.body.zipCode).to.equal(requestBody.zipCode);
        expect(response.body.date).to.equal(requestBody.date);
        expect(response.body.time).to.equal(requestBody.time);
        expect(response.body.joined).to.equal(requestBody.joined);
        expect(response.body.sportName).to.equal(requestBody.sportName);
    });

    after(function (done) {
        chai.request("https://play-buddies.azurewebsites.net")
            .delete(`/app/playerrequest/${createdRequestId}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
