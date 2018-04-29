import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    ReactTestUtils.Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });

  it('dsiable button, after user has voted', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={()=>true}
              hasVoted="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('add label to the voted item', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={()=>true}
              hasVoted="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('render only the winner', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Voting winner="Trainspotting" />
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

});
