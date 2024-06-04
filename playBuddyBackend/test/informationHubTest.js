var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

var http = require('http');
chai.use(chaiHttp);

describe('Test Hub result', function () {

	var requestResult;
	var response;
    var sportName = "Tennis";
		 
    before(function (done) {
        chai.request("https://play-buddies.azurewebsites.net")
			.get("/app/hub/sport/" + sportName)
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return a sportName property with Tennis value ', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
        expect(response.body).to.have.property('sportName').equal(sportName);
    });	

	it('The first entry in the array has known properties', function(){
	    expect(requestResult).to.include.keys('sportName');
	    expect(requestResult).to.have.property('history');
		expect(response.body).to.not.be.a.string;
	});

	it('The elements in the array have the expected properties ', function (){
        expect(response.body).to.have.property('sportName');
		expect(response.body).to.have.property('history');
		expect(response.body).to.have.property('rules');
		expect(response.body).to.have.property('gearInfo');

		expect(response.body.rules).to.satisfy(
			function (rules) {
				for (var i = 0; i < rules.length; i++) {
					expect(rules[i]).to.have.property('description');
				}
				return true;
			});
		expect(response.body.gearInfo).to.satisfy(
			function (gearInfo) {
				for (var i = 0; i < gearInfo.length; i++) {
					expect(gearInfo[i]).to.have.property('gearName');
					expect(gearInfo[i]).to.have.property('gearDescription');
				}
				return true;
			});
    });	
	
});