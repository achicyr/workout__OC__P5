const params = new URL(location).searchParams
, orderID = params.get('orderId')

orderId.innerHTML = orderID
localStorage.clear()