import React,{Component} from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import classNames from 'classnames';



const styles = theme => ({
  
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
 
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  }
});


  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
  ];

class FooterContainer extends Component{
    render(){
        const { classes} = this.props;
        return (
            <div>
               {/* Footer */}
              <footer className={classNames(classes.footer, classes.layout)}>
                <Grid container spacing={32} justify="space-evenly">
                  {footers.map(footer => (
                    <Grid item xs key={footer.title}>
                      <Typography variant="h6" color="textPrimary" gutterBottom>
                        {footer.title}
                      </Typography>
                      {footer.description.map(item => (
                        <Typography key={item} variant="subtitle1" color="textSecondary">
                          {item}
                        </Typography>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </footer>
              {/* End footer */}
            </div>
           
        )
    }
}

FooterContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
//   function mapStateToProps(state){
//       return {
//           products:state.shopReducer.products
//       }
     
//   }
  
const Footer = connect()(FooterContainer)

  
  export default withStyles(styles)(Footer);