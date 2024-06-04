process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

var http = require('http');
chai.use(chaiHttp);

describe('Test Request list result', function () {

	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("https://play-buddies.azurewebsites.net")
			.get("/app/playerrequest")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 2 objects', function (){
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
    });
    
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('userName');
	    expect(requestResult[0]).to.have.property('playerNeeded');
		expect(response.body).to.not.be.a.string;
	});

	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.have.length.above(2);
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('userName');
					expect(body[i]).to.have.property('playerNeeded');
                    expect(body[i]).to.have.property('zipCode');
                    expect(body[i]).to.have.property('date');
                    expect(body[i]).to.have.property('time');
					expect(body[i]).to.have.property('joined');
					expect(body[i]).to.have.property('sportName').that.is.a('string');
				}
				return true;
			});
	});	
	
});