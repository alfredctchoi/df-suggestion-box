import React, {Component} from 'react'

const alphanumbericRegex = new RegExp(/^[a-zA-Z0-9]*$/);

class BoxInputView extends Component {

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      isPristine: true,
      boxId: '',
      error: null
    }
  }

  render() {
    const {onContinue, errorMessage} = this.props;
    const {isPristine, boxId, error} = this.state;
    return <div>
      <div className="form-group">
        <label htmlFor="boxId">Enter your suggestion box id below.</label>
        <input type="text"
               id="boxId"
               className="form-control"
               placeholder="Box Identifier"
               value={boxId}
               onKeyDown={this.onKeyDown}
               onChange={this.onInputChange}/>

        {
          error && <p className="form-text text-danger">
            {error.message}
          </p>
        }

      </div>

      {
        !error && !isPristine && <div className="form-group text-right">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <button type="submit"
                      disabled={errorMessage ? 'disabled' : ''}
                      className="btn btn-primary "
                      onClick={() => onContinue(boxId)}>
                View feedback
              </button>
            </li>
            <li className="list-inline-item">
              <button type="submit"
                      disabled={errorMessage ? 'disabled' : ''}
                      className="btn btn-primary"
                      onClick={() => onContinue(boxId)}>
                Submit feedback
              </button>
            </li>
          </ul>
        </div>
      }
    </div>
  }

  onInputChange(e){
    const {value} = e.target;
    const newState = {
      isPristine: false,
      boxId: value,
      error: null
    };

    if (value === ''){
      newState.error = {
        message: 'Please enter an identifier'
      };
    }

    if (!alphanumbericRegex.test(value)){
      newState.error = {
        message: 'Identifier can only contain alphanumeric characters'
      }
    }

    this.setState(newState);
  }

  onKeyDown(e){
    if (e.which === 13){
      this.props.onContinue();
    }
  }
}

export default BoxInputView