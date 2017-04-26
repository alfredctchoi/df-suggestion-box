import React from 'react'

const BoxInputView = ({value, onContinue, onChange, onKeyDown, errorMessage}) => (
  <div>
    <div className="form-group">
      <label htmlFor="boxId">Enter your suggestion box id below.</label>
      <input type="text"
             id="boxId"
             className="form-control"
             placeholder="Box Identifier"
             value={value ? value : ''}
             onKeyDown={onKeyDown}
             onChange={onChange}/>

      {
        errorMessage && <p className="form-text text-danger">
          {errorMessage}
        </p>
      }

    </div>
    <div className="form-group text-right">
      <button type="submit"
              disabled={errorMessage ? 'disabled' : ''}
              className="btn btn-primary"
              onClick={onContinue}>
        Proceed to feedback
      </button>
    </div>
  </div>
);

export default BoxInputView