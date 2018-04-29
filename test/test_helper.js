import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {JSDOM} = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const {win} = dom;

global.window = win;

Object.keys(dom.window).forEach((key) => {
  if (!(key in global)) {
    global[key] = dom.window[key];
  }
});

chai.use(chaiImmutable);
