const Tools = {
    generateFields(fields){
        let generateFields = {};
        fields.map((field)=>{
            generateFields = {
                ...generateFields,
                [field]:{
                    value:''
                }
            }
        })
        return generateFields
    },
    changeHandler(event,form){
      
        const name = event.target.name;
        const value = event.target.value;
      
        form.setState({
          formControls: {
              ...form.state.formControls,
              [name]: {
              ...form.state.formControls[name],
              value
            }
          }
        });
    },
    objectFormat:function(obj){
        let props = Object.keys(obj);
        let formated = {};
        props.map((p)=>{
            formated = {
                ...formated,
                [p]:obj[p].value
            }
        })
        return formated
    }
}

export default Tools