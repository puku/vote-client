import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Winner from './Winner';
import Vote from './Vote';

class Voting extends React.PureComponent {
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}

export default Voting = Voting;
export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
