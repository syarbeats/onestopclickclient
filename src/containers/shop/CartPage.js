import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import shop_action from '../../actions/shop_action'
import Header from './Header'
import Footer from './Footer'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  productDetail:{
    marginTop:50,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paperCart: {
    padding: theme.spacing.unit * 2,
    height:200,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  getProductButton:{
    backgroundColor:'#5137ba',
    color:'white'
  }
});

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
];

class CartPageContainer extends Component {
    constructor(props){
        super(props)
    }
 
    componentDidMount(){
        const {match:{params},dispatch} = this.props;
        const {id} = params
        dispatch(shop_action.readProduct(localStorage.getItem("token"),id))

    }

    render(){
        const { classes,product} = this.props;

        return (
            <React.Fragment>
              <CssBaseline />
              <Header />
              <main className={classes.layout}>
              <div className={classes.productDetail}>

              <Grid container spacing={24}>
        
        <Grid item xs={12}>
          <Paper className={classes.paperCart}>Cart Here</Paper>
        </Grid>
        
      
      </Grid>

                </div>
               
                    
              </main>
             <Footer />
            </React.Fragment>
          );
    }
  
}

CartPageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
      product:state.shopReducer.product
    }
   
}

const CartPage = connect(mapStateToProps)(CartPageContainer)

export default withStyles(styles)(CartPage);