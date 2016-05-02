/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/definitions/chai/index.d.ts" />
import chai = require('chai');
import {Test} from "../src/Test";
var expect = chai.expect;


describe('One Example Test', () => {
  let test: Test = new Test();
  it('should print hello world', (done) => {
    expect(test.test()).to.equals('Hello World');
      expect(2+4).to.equals(6);
      done();
  });
});
