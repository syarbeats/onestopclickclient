import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Input} from 'reactstrap'


class CheckboxComponent extends Component {

  constructor(props){
    super(props)
   
    this.state = {
      checked:false
    }
  }

 


  render() {

    const {handleChooseAcquiredCategory,recId} = this.props
  
    return (
      <Input className="form-check-input" type="checkbox" onClick={e=>handleChooseAcquiredCategory(recId,e)} />

    )
  }
}

function mapStateToProps(state) {
  
  return {
    hello:'hello'
  }
}

const Checkbox = connect(mapStateToProps)(CheckboxComponent);

export default Checkbox;
