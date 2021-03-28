const chai = require('chai');
const axios = require('axios');

const should = chai.should();
const expect = chai.expect;

describe('a suite of tests', function () {

    beforeEach(function (done) {

        this.timeout(0);

    });
});

describe('Timezone Api', () => {

    describe('Get timezone response', () => {

        it('Response should be object, should contain datetime', (done) => {

            axios.get('https://timezone.abstractapi.com/v1/current_time?api_key=468b2a5d4adf4301836e7459942d7bae&location=serbia')
                .then(data => {

                    data.status.should.equal(200);

                    data.data.should.be.an('object');

                    data.data.should.have.property('datetime');

                    done();
                })
                .catch(e => {

                    done(e);
                });
        });
    });
});