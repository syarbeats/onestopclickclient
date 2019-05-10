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
});



class HomePageContainer extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
 
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(shop_action.readProducts(localStorage.getItem("token")))

    }

    handleClick(productId){
        this.props.history.push("/product/"+productId);
    }

    toHomeLink(){
        this.props.history.push("/");
    }

    render(){
        const { classes,products} = this.props;

        return (
            <React.Fragment>
              <CssBaseline />
                <Header toHomeLink={this.toHomeLink} />
              <main className={classes.layout}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Promo Hari ini
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" component="p">
                    Daftar promo hari ini.
                  </Typography>
                </div>
                {/* End hero unit */}
                <Grid container spacing={40} alignItems="flex-end">
                  {products.map(product => (
                    // Enterprise card is full width at sm breakpoint
                    // <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
        
                   image="public/assets/img/movie/movie.jpg"
               
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Rp. {product.price}
                  </Typography>
                  <Typography component="p">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
             
                <Button size="small" color="primary" onClick={e=>this.handleClick(product.id)}>
                  More Detail
                </Button>
              </CardActions>
            </Card>
                    </Grid>
                  ))}
                </Grid>
              </main>
              <Footer />
            </React.Fragment>
          );
    }
  
}

HomePageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        products:state.shopReducer.products
    }
   
}

const HomePage = connect(mapStateToProps)(HomePageContainer)

export default withStyles(styles)(HomePage);