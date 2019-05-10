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
import Cart from '../../helpers/Cart'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TAX_RATE = 0.07;

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
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button:{
    marginTop:20,
    marginLeft:20,
    textAlign:'right'
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}






const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
];

class CartPageContainer extends Component {
    constructor(props){
        super(props)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleClearCart = this.handleClearCart.bind(this)
        this.state = {
          cart:{}
        }
    }
 
    componentDidMount(){
        const {dispatch} = this.props;

        this.setState({
           cart:{
             ...this.state.cart,
             products:Cart.get()
           }
        })


    }

    handlePageClick(page){
      this.props.history.push(page)
    }

    handleClearCart(){
      Cart.clear()
    }

    render(){
        const { classes} = this.props;
        const products = this.state.cart.products

        const preRows = [];

        if(products){
          products.map((product,id)=>{
            preRows.push([product.name,product.quantity,product.price])
          })
        }
        

        const rows = preRows.map((row, id) => createRow(id, ...row));

        const invoiceSubtotal = subtotal(rows);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
       
        return (
            <React.Fragment>
              <CssBaseline />
              <Header />
              <main className={classes.layout}>
              <div className={classes.productDetail}>

              <Grid container spacing={24}>
        
        <Grid item xs={12}>
          <Paper className={classes.paperCart}>
          <Typography  align="left" variant="h4" color="textPrimary" gutterBottom>
                Cart 
          </Typography>
          <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">@</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        
        </TableBody>
      </Table>
      <Button variant="contained"  className={classes.button} onClick={e=>this.handleClearCart()}
                   >
                   Clear
                </Button>
      <Button variant="contained" className={classes.button} onClick={e=>this.handlePageClick("/shop")}
                   >
                   Continue Shopping
                </Button>

                <Button variant="contained" color="primary" className={classes.button} onClick={e=>this.handlePageClick("/checkout")}
                   >
                   Checkout
                </Button>

            

          </Paper>
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