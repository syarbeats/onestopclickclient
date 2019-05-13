import React,{Component} from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom';
import { authLogout } from '../../actions/auth_action';
import {fakeAuth} from '../../containers/UserRoute'


const styles = theme => ({
   
    appBar: {
      position: 'relative',
      backgroundColor:'#5137ba',
      color:'white'
    },
    toolbarTitle: {
      flex: 1,
    },
    buttonTitle:{
      color:'white'
    },
  
  });

class HeaderContainer extends Component{
    constructor(props){
        super(props)
      //  this.hello = this.hello.bind(this);
        this.state={
          userName:''
        }
       
    }

    componentDidMount(){
        const token = localStorage.getItem("token");
        if(token){
           this.setState({
             userName:'Tamara'
           })
        }
    }

   
    handlePageClick(page){
      this.props.history.push(page)
    }

    signOut(e) {
      e.preventDefault()
      const {dispatch} = this.props
      localStorage.setItem("token","")
      fakeAuth.isAuthenticated = false
      dispatch(authLogout())
      this.props.history.push('/login')
    }

 
    render(){
        const { classes,toHomeLink} = this.props;
        const userName = this.state.userName
        const loggedIn = userName.length > 1?true:false
        return (
            <div>
                 <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                            
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={e=>this.handlePageClick("/")}>
                    One Stop Click
                  </Typography>
               
                  
                  
                  <Button className={classes.buttonTitle} onClick={e=>this.handlePageClick("/search")}>Search</Button>
                  <Button className={classes.buttonTitle} onClick={e=>this.handlePageClick("/shop")}>Categories</Button>
                  <Button className={classes.buttonTitle} onClick={e=>this.handlePageClick("/cart")}>Cart ( 0.00 )</Button>
                  { loggedIn? (
                
                     <Button color="primary" className={classes.buttonTitle} onClick={e=>this.signOut(e)} variant="outlined">
                     Hello, {userName} Logout
                   </Button>
 
                  
                  ):(
                    <Button color="primary" className={classes.buttonTitle} onClick={e=>this.handlePageClick("/login")} variant="outlined">
                    Login
                  </Button>
                  )
                  }
                 
                </Toolbar>
              </AppBar>
            </div>
           
        )
    }
}

HeaderContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//   function mapStateToProps(state){
//       return {
//           products:state.shopReducer.products
//       }
     
//   }
  
const Header = connect()(HeaderContainer)

  
  export default withRouter(withStyles(styles)(Header));