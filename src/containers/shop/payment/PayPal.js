import React,{Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class PayPal extends Component {

    render() {
      
        const onSuccess = (payment) => {
         	console.log("The payment was succeeded!", payment);
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
         }
 
        const onError = (err) => {
            console.log("Error!", err);
         }
 
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total = 50; 
        const client = {
            sandbox:    'AQAaytmC3c8nubxFk2Dq3K-8hhwqTDJYqoGwYFnjBIOoLa1ss0VbGZ6Za5sbK4bRiiURearUS2p7XNLd',
          //  production: 'YOUR-PRODUCTION-APP-ID',
        }
         return (
            <PaypalExpressBtn env={env} client={client} currency={currency} 
            total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}