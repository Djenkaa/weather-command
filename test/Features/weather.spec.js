const chai = require('chai');
const axios = require('axios');

const should = chai.should();
const expect = chai.expect;


describe('a suite of tests', function () {

    beforeEach(function (done) {

        this.timeout(0);

    });
});


describe('Weather Api', () => {


    describe('Get weather response by city name', () => {

        it('Response should return status 200', (done) => {

            axios.get('https://api.openweathermap.org/data/2.5/weather?q=novi%20banovci&appid=5c3ef0f58144aafdbfede6a6be586f40')
                .then(data => {

                    data.data.should.be.an('object');

                    done();
                })
                .catch(e => {

                    done(e);
                });
        });


        it('Response should contain temp, and have to be integer', (done) => {

            axios.get('https://api.openweathermap.org/data/2.5/weather?q=novi%20banovci&appid=5c3ef0f58144aafdbfede6a6be586f40')
                .then(data => {

                    data.data.should.have.property('main');

                    data.data.main.should.have.property('temp');

                    data.data.main.temp.should.be.an('number');

                    done();
                })
                .catch(e => {

                    done(e);
                });
        });
    });
});