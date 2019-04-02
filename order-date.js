function init(){
  var currentDate = new Date().toLocaleDateString();
  document.getElementById('orderDate').value = currentDate;

  var orderButton=document.getElementById('submitOrder')
  orderButton.addEventListener('click', (event) => orderSubmit(event));


  var itemNameBox=document.getElementById('itemN');
  var amountBox=document.getElementById('amount');
  var unitPriceBox=document.getElementById('unitPrice');
  var totalPriceBox=document.getElementById('totalPrice');
  var deliveryOptions = document.getElementsByName('delivery');
  var totalAllBox = document.getElementById('totalAll');
  var orderDateBox = document.getElementById('orderDate');

  orderDateBox.addEventListener('blur', (event) => orderSubmit(event));

  itemNameBox.addEventListener('change', (event) => itemNumber(itemNameBox, unitPriceBox, totalPriceBox, amountBox, totalAllBox, deliveryOptions));
  
  amountBox.addEventListener('change', (event)=> calculateTotalAmount(amountBox, unitPriceBox, totalPriceBox, totalAllBox, deliveryOptions));

  deliveryOptions[0].addEventListener('click', (event) => addDeliveryFeeToTotal(totalAllBox, totalPriceBox, deliveryOptions));
  deliveryOptions[1].addEventListener('click', (event) => addDeliveryFeeToTotal(totalAllBox, totalPriceBox , deliveryOptions));
  deliveryOptions[2].addEventListener('click', (event) => addDeliveryFeeToTotal(totalAllBox, totalPriceBox, deliveryOptions));
}

function orderSubmit(event){
    var orderDateValidation=document.getElementById('invalidOrderDate');
    var dateValue=document.getElementById('orderDate').value;
    if(!validateDate(dateValue)){
      orderDateValidation.style.display='block';  
    } else{
      orderDateValidation.style.display='none';  
    }
}

function calculateTotalAmount(amountBox, unitPriceBox, totalPriceBox, totalAllBox, deliveryOptions){
  if(!amountBox.value ||  !unitPriceBox.value)
   return;
   totalPriceBox.value = amountBox.value * unitPriceBox.value;
   addDeliveryFeeToTotal(totalAllBox,totalPriceBox, deliveryOptions);
}

function itemNumber(itemNameBox, unitPriceBox, totalPriceBox, amountBox, totalAllBox, deliveryOptions){
  var i = itemNameBox.selectedIndex;
    unitPriceBox.value = itemNameBox.options[i].value;
    totalPriceBox.value = amountBox.value * unitPriceBox.value;
    addDeliveryFeeToTotal(totalAllBox,totalPriceBox, deliveryOptions);
}

function validateDate(date){
  var dates = date.split('/');
  var day = dates[0];
  var month = dates[1];
  var year = dates[2];

  var myDate = new Date(year, month-1, day);
  var today = new Date();

  return myDate < today
    ?false
    :true;
}
function addDeliveryFeeToTotal(totalAllBox, totalPriceBox, deliveryOptions){
  var price = 0;
  if(deliveryOptions[0].checked){
    price = 0;
  }else if(deliveryOptions[1].checked){
    price = 2.99;
  }else if(deliveryOptions[2].checked){
    price = 4.99;
  }
  totalAllBox.value = `£${(Number(totalPriceBox.value) + price).toFixed(2)}`
}

init();


