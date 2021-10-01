const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs')
app.use(express.json())

app.get('/health', (req, res) => {
   res.send('You keep using that word. I do not think it means what you think it means.');
});

//get all orders
app.get('/orders/all', (req, res) => {
  //should probably error check here :/
  res.send(fs.readFileSync('../data/orders.json', 'utf-8'))
})

//get all orders by customer name because they have no id
app.get('/orders/by_customer', (req, res) => {
  let toRet = []
  const allOrders = fs.readFileSync('../data/orders.json', 'utf-8')
  ordersJson = JSON.parse(allOrders)
  for(var order in ordersJson){
    if(ordersJson[order].person == req.body.name){
      toRet.push(ordersJson[order])
    }
  }
  // console.log(toRet)
  res.send(toRet)
})

//update an order based on order id
//please include the whole new order in the put request
app.put('/orders/update', (req, res) => {
  // console.log(req.body.id)
  // res.send(req.body.id)
  const allOrders = fs.readFileSync('../data/orders.json', 'utf-8')
  ordersJson = JSON.parse(allOrders)
  for(var order in ordersJson){
    if(ordersJson[order].id == req.body.id){
        ordersJson[order] = req.body
    }
  }

  fs.writeFileSync('../data/orders.json', JSON.stringify(ordersJson))
  res.send(ordersJson)

})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;