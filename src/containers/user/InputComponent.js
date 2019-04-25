import React,{Component} from 'react'
import  {Input} from 'reactstrap';

class InputComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Input type={this.props.type}  name={this.props.name} placeholder={this.props.placeholder}  onChange={this.props.handleChange}  value={this.props.value} />
        )
    }
}

export default InputComponent