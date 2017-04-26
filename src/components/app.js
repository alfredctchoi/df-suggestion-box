import React, {Component} from 'react'
import Row from './row'
import firebase from 'firebase'
import FinishedView from './finished-view'
import BoxInputView from './box-input-view'
import CommentInputView from './comment-input-view'

import styles from './app.css'

const STEPS = {
  BOX_ID: 'BOX_ID',
  COMMENT_INPUT: 'COMMENT_INPUT',
  FINISHED: 'FINISHED'
};

class App extends Component {

  constructor(props) {
    super(props);

    this.onContinue = this.onContinue.bind(this);
    this.onBoxInputKeyDown = this.onBoxInputKeyDown.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onBoxInputChange = this.onBoxInputChange.bind(this);
    this.setStateWithError = this.setStateWithError.bind(this);
    this.hasValidBoxId = this.hasValidBoxId.bind(this);

    this.state = {
      inputBoxId: null,
      commentInput: null,
      step: STEPS.BOX_ID,
      boxErrorMessage: null
    };

    this.viewMapping = {
      [STEPS.BOX_ID]: {
        component: BoxInputView,
        props: {
          onContinue: this.onContinue,
          onKeyDown: this.onBoxInputKeyDown,
          onChange: this.onBoxInputChange,
        }
      },
      [STEPS.COMMENT_INPUT]: {
        component: CommentInputView,
        props: {
          onChange: this.onCommentChange,
          onSubmit: this.onCommentSubmit,
          onPrevious: () => this.setState({step: STEPS.BOX_ID})
        }
      },
      [STEPS.FINISHED]: {
        component: FinishedView,
        props: {
          backToHome: (e) => this.setState({step: STEPS.BOX_ID}),
          submitAnotherFeedback: () => this.setState({step: STEPS.COMMENT_INPUT})
        }
      },
    };

    // const ref = firebase.database().ref('/box-abc');
    // ref.on('value', (res) => {
    //   console.log(res.val());
    // });
    // ref.limitToFirst(50);
  }

  render() {
    const view = this.viewMapping[this.state.step];
    const ViewComponent = view.component;
    const viewProps = view.props;
    const miscProps = {
      errorMessage: this.state.boxErrorMessage,
      value: this.state.inputBoxId
    };

    return <div className="container">
      <Row>
        <div className="col-12 col-md-6 offset-md-3">
          <div className="text-center sb__title">
            <h1>DF Suggestion Box</h1>
          </div>
          <ViewComponent {...miscProps} {...viewProps}/>
        </div>
      </Row>
    </div>
  }

  hasValidBoxId() {
    if (!this.state.inputBoxId) return false;
    if (this.state.inputBoxId.indexOf(' ') > -1) return false;
    return true;
  }

  setStateWithError() {
    let errorMessage = this.hasValidBoxId() ? null : 'Please enter an ID.';
    this.setState({
      boxErrorMessage: errorMessage
    })
  }

  onBoxInputChange({target}) {
    const newState = this.state;
    newState.inputBoxId = target.value;
    this.setState(newState, this.setStateWithError)
  }

  onBoxInputKeyDown(e) {
    if (e.which !== 13)
      return;

    this.onContinue();
  }

  onContinue(boxId) {
    this.setState({
      inputBoxId: boxId,
      step: STEPS.COMMENT_INPUT
    });
  }

  onCommentChange({target}) {
    this.setState({commentInput: target.value})
  }

  onCommentSubmit() {
    const payload = {
      created: Date.now(),
      comment: this.state.commentInput
    };
    const ref = firebase.database().ref(`/box-${this.state.inputBoxId}/feedback`);
    const newComment = ref.push();
    newComment.set(payload)
      .then(() => {
        this.setState({step: STEPS.FINISHED})
      });
  }
}

export default App;