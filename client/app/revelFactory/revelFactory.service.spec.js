'use strict';

describe('Service: revelFactory', function () {

  // load the service's module
  beforeEach(module('revelerApp'));

  // instantiate service
  var revelFactory;
  beforeEach(inject(function (_revelFactory_) {
    revelFactory = _revelFactory_;
  }));

  it('should do something', function () {
    expect(!!revelFactory).toBe(true);
  });

});
