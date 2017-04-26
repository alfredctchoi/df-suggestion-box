import React, {Component} from 'react'
import Row from './row'
import Column from './column'
import firebase from 'firebase'

import styles from './app.css'

const STEPS = {
  BOX_ID: 'BOX_ID',
  COMMENT_INPUT: 'COMMENT_INPUT',
  FINISHED: 'FINISHED'
};

const FinishedView = ({backToHome, submitAnotherFeedback}) => (
  <div className="text-center">
    <h3>Your feedback has been submitted!</h3>
    <div className="form-group">
      <button type="button" className="btn btn-primary" onClick={submitAnotherFeedback}>
        Submit another feedback
      </button>
    </div>
    <div>
      <a href="javascript:void(0)" onClick={backToHome}>
        Back to home page
      </a>
    </div>
  </div>
);

const BoxInputView = ({onContinue, onChange, onKeyDown}) => (
  <div>
    <div className="form-group">
      <label htmlFor="boxId">Enter your suggestion box id below.</label>
      <input type="text"
             id="boxId"
             className="form-control"
             placeholder="Box Identifier"
             onKeyDown={onKeyDown}
             onChange={onChange}/>
    </div>
    <div className="form-group text-right">
      <button type="submit" className="btn btn-primary" onClick={onContinue}>
        Proceed to feedback
      </button>
    </div>
  </div>
);

const CommentInputView = ({onChange, onSubmit, onPrevious}) => (
  <div>
    <label htmlFor="comment-input">
      Please enter your feedback below and click the submit button.
    </label>
    <div className="form-group">
        <textarea id="comment-input" className="form-control" rows="5"
                  onChange={onChange}/>
    </div>
    <div className="form-group text-right">
      <a className="margin-right" href="javascript:void(0)" onClick={onPrevious}>
        Previous
      </a>
      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        Submit my feedback
      </button>
    </div>
  </div>
);

class App extends Component {

  constructor(props) {
    super(props);

    this.onContinue = this.onContinue.bind(this);
    this.onBoxInputKeyDown = this.onBoxInputKeyDown.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onBoxInputChange = this.onBoxInputChange.bind(this);

    this.state = {
      inputBoxId: null,
      commentInput: null,
      step: STEPS.BOX_ID
    };

    this.viewMapping = {
      [STEPS.BOX_ID]: {
        component: BoxInputView,
        props: {
          onContinue: this.onContinue,
          onKeyDown: this.onBoxInputKeyDown,
          onChange: this.onBoxInputChange
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
  }

  render() {
    const view = this.viewMapping[this.state.step];
    const ViewComponent = view.component;
    const viewProps = view.props;
    return <div className="container">
      <Row>
        <Column cols={6} offset={3}>
          <div className="text-center sb__title">
            <h1>DF Suggestion Box</h1>
          </div>
          <ViewComponent {...viewProps}/>
        </Column>
      </Row>
    </div>
  }

  onBoxInputChange({target}) {
    this.setState({
      inputBoxId: target.value
    })
  }

  onBoxInputKeyDown(e) {
    if (e.which !== 13)
      return;

    this.onContinue();
  }

  onContinue() {
    this.setState({step: STEPS.COMMENT_INPUT});
  }

  onCommentChange({target}) {
    this.setState({commentInput: target.value})
  }

  onCommentSubmit() {
    const payload = {
      created: Date.now(),
      comment: this.state.commentInput
    };
    const ref = firebase.database().ref(`/box-${this.state.inputBoxId}`);
    const newComment = ref.push();
    newComment.set(payload)
      .then(() => {
        this.setState({step: STEPS.FINISHED})
      });
  }
}

export default App;