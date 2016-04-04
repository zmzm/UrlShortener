var expect = require('chai').expect;
var request = require('supertest');
var app = require('../app.js');

describe('User routes', function() {
    describe('#login', function() {
        it('should login a user', function(done) {
            request(app)
                .post('/user/login')
                .send({username: 'test', password: 'test'})
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.user).to.be.an('object');
                    expect(res.body.user.username).to.equal('test');
                    done();
                });
        });
    });
    describe('#logout', function() {
        it('should logout a user', function(done) {
            request(app)
                .get('/user/logout')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(err).to.equal(null);
                    expect(res.body.status).to.equal('Logout successfully!');
                    done();
                });
        });
    });
});