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
        chai.request("http://localhost:8080")
			.get("/app/hub/" + sportName)
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
	
});