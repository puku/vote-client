import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {JSDOM} = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = dom;
const {document} = dom.window;

chai.use(chaiImmutable);
