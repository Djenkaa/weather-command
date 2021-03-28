const chai = require('chai');
const axios = require('axios');

const should = chai.should();
const expect = chai.expect;


describe('a suite of tests', function () {

    beforeEach(function (done) {

        this.timeout(0);

    });
});



describe('Country Api', () => {


    describe('Get country response', () => {

        it('Response should be an object', (done) => {

            axios.get('https://restcountries.eu/rest/v2/alpha/rs')
                .then(data => {

                    data.data.should.be.an('object');

                    done();
                })
                .catch(e => {

                    done(e);
                });
        });


        it('Json should conatin country name', (done) => {

            axios.get('https://restcountries.eu/rest/v2/alpha/rs')
                .then(data => {

                    expect(data.data).to.have.property('name');

                    done();
                })
                .catch(e => {

                    done(e);
                });
        });
    });
});