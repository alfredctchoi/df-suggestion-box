import React from 'react'

const FinishedView = ({backToHome, submitAnotherFeedback}) => (
  <div className="text-center">
    <h4>Thank you for your feedback</h4>
    <div className="form-group margin-top">
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


export default FinishedView