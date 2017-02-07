/**
 * Created by kavuri on 2/3/2017.
 */
var express= require('express');
var bodyParser = require('body-parser');
var products = [
    {
        id:1,
        name: 'laptop',
        qty: '1'
    },
    {
        id:2,
        name: 'ipad',
        qty: '2'
    }
];
var currentId = 2;
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products',function(req,res){
    res.send({products: products});
})

app.post('/products',function(req,res){

    var maxId = Math.max.call(null,currentId);

    console.log("max id is "+maxId);
    var productName = req.body.name;
    console.log(productName);
    var productQty = req.body.qty;
    currentId++;
    ++maxId;
    products.push({
        id: maxId,
        name:productName,
        qty: productQty

    });
    res.send('successfully created');
});

app.put('/products/:id',function(req,res){
    var m;
    var id = req.params.id;
    console.log("id is "+ id);
    var newName = req.body.name;
    console.log("newName is "+newName);
    var newQty = req.body.qty;
    console.log("newQty is "+newQty);
    var found = false;
    /*for(m=0;m<products.length;m++){
        if(id === products[m].id){
            products.name = newName;
            products.qty = newQty;
        }
    }*/
    products.forEach(function(product,index){
        console.log("product id is "+product.id);
        console.log("typeof id is "+ typeof id);
        console.log("typeof product.id is "+ typeof product.id);
        if(!found && product.id === Number(id)){
            console.log("updated");
            product.name = newName;
            product.qty = newQty;
        }
    });
    res.send('successfully updated product');
})
app.delete('/products/:id',function(req,res){
    var maxNum;
    var id = req.params.id;
    var found = false;
    var i;
    var j;
    console.log("products.length is "+products.length);
    for(i=0;i<products.length;i++){
        console.log("products[i] is "+products[i].id);
        if(Number(id) === products[i].id){
            console.log("products[i].id is "+products[i].id);
            j = i;
            break;
        }
    }
     products.splice(j,1);
    maxNum = Math.max.call(null,currentId);
    if(Number(id) === maxNum){
        currentId--;
    }
    console.log(products);
    /*products.forEach(function(product,index){
        if(!found && products.id === Number(id)){
            products.splice(index,1);
        }
    });*/
    console.log("successfully deleted");
})
app.listen(3030);
console.log("server listening on 3030");