const LOCALSTORAGE_NAME  = 'osc-cart'

// Created by Tommy Toban on 10/05/2019

class Cart{
    static add(product){
        const products = this.get();

        // find product
        if(products.length > 0){
            let index = products.findIndex(function(p){
                return product.id===p.id
            })
            console.log(index);
            if(index >= 0){
                products[index].quantity = products[index].quantity+1
            }else{
                this.insert(products,product)
            }

            

        }else{
            this.insert(products,product)
        }

        
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(products));
    }
    static get(){
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) || [];
    }
    static insert(products,product){
        products.push({
            id:product.id,
            name:product.name,
            price:product.price,
            quantity:1,
            total:product.price
        });
    }
    static clear(){
        localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify([]));
    }
}

export default Cart