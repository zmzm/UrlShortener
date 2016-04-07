describe('AuthService', function () {

    var AuthService, httpBackend, requestData;

    beforeEach(function () {

        module('Services');

        requestData = {username: "test", password: "test"};

        inject(function ($httpBackend, _AuthService_) {
            AuthService = _AuthService_;
            httpBackend = $httpBackend;
        })
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an login function', function () {
        expect(angular.isFunction(AuthService.logIn)).toBe(true);
    });

    it('should have sent a POST request to the login', function () {
        var returnData = { status: 200, message: "Login successful!", user: {id: "56fe8ebcb1a073581d797f52", username: "test"}};

        httpBackend.expectPOST('/user/login', requestData).respond(returnData);

        var returnedPromise = AuthService.logIn(requestData.username, requestData.password);
        var result = null;

        returnedPromise.then(function(response) {
            result = response;
        });
        httpBackend.flush();
        expect(result).toEqual(returnData);
    });

});