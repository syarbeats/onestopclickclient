import React from 'react';

class EditUser extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: {},
            username : '',
            password : '',
            firstname: '',
            lastname: '',
            email: '',
            message: '',
        }

        this.getUserList = this.getUserList.bind(this);
        this.submitData = this.submitData.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.updateFirstNameInput = this.updateFirstNameInput.bind(this);
        this.updateLastNameInput = this.updateLastNameInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);
    }

    updateEmailInput(event){
        this.setState({email : event.target.value});
        console.log("Email: "+ this.state.email);
    }

    updateUsernameInput(event){
        this.setState({username : event.target.value})
    }

    updatePasswordInput(event){
        this.setState({password : event.target.value})
    }

    updateFirstNameInput(event){
        this.setState({firstname : event.target.value})
    }

    updateLastNameInput(event){
        this.setState({lastname : event.target.value})
    }

    getUserList(){
        fetch("http://localhost:8080/api/v1/users/"+this.props.match.params.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE1NTYxNjk2NTAsImV4cCI6MTU1NjE3NTY5OH0.-yWLTTGgc6C1skvNZN8lBZozVPj21wL2b6SgIUyaia8",
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({ user: data });
                console.log("response:"+JSON.stringify(data));
            });
    }

    componentDidMount() {
        console.log("UserId: "+this.props.match.params.id);
        console.log("Get user with userId: "+this.props.match.params.id);
        this.getUserList();
        console.log("data: "+ JSON.stringify(this.state.user));
    }


    submitData = () =>{
        console.log("Username "+ this.state.username);
        console.log("Kirim Data "+ this.state.firstname+" "+this.state.lastname);

        if(this.state.username !== "" && this.state.firstname !== "" && this.state.lastname !== "" && this.state.password !== "" && this.state.email !== ""){
            let formData = new FormData();
            formData.append('username', this.state.username);
            formData.append('firstname', this.state.firstname);
            formData.append('lastname', this.state.lastname);
            formData.append('password', this.state.password);
            formData.append('email', this.state.email);

            fetch("http://localhost:8080/api/v1/users/user/edit", {
                method: 'POST',
                body: formData,
                headers:{
                    'Authorization': 'Bearer '+ "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQWRtaW4iLCJpYXQiOjE1NTYxNjk2NTAsImV4cCI6MTU1NjE3NTY5OH0.-yWLTTGgc6C1skvNZN8lBZozVPj21wL2b6SgIUyaia8",
                }

            }).then(res => {
                console.log("Status:"+res.status);
                if(res.status == "200"){
                    this.setState({message: "User has been registered successfully!",
                        username: '',
                        firstname: '',
                        lastname: '',
                        password: '',
                        email: ''
                    });
                }
            })
        }else {
            console.log("Please fill the data completely!");
            this.setState({message: "Please fill the data completely!"});
        }

    }

    render() {
        return(
            <div className="card">
                <div className="card-header">Edit User Data</div>
                <div className="card-body">
                    <div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <label className="btn btn-primary" value={this.state.message}>{this.state.message}</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="username">Username:</label>
                            <div className="col-sm-10">
                                <input type="text"  value={this.state.user.username} onChange={this.updateUsernameInput} className="form-control" placeholder="Enter your username" name="username" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="password">Password:</label>
                            <div className="col-sm-10">
                                <input type="password"  value={this.state.user.password} onChange={this.updatePasswordInput} className="form-control" placeholder="Enter your password" name="password" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="firstname">FirstName:</label>
                            <div className="col-sm-10">
                                <input type="text"  value={this.state.user.firstName} onChange={this.updateFirstNameInput} className="form-control" placeholder="Enter your firstname" name="firstname" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="lastname">LastName:</label>
                            <div className="col-sm-10">
                                <input type="text"  value={this.state.user.lastName} onChange={this.updateLastNameInput} className="form-control" placeholder="Enter your lastname" name="lastname" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                            <div className="col-sm-10">
                                <input type="text"  value={this.state.user.email} onChange={this.updateEmailInput} className="form-control" placeholder="Enter your email" name="email" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" onClick={() => this.submitData()} className="btn btn-info">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;