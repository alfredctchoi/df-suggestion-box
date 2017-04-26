import React from 'react'

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

export default CommentInputView;