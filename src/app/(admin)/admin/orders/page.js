import OrdersCmp from "@/app/components/admin/orders/OrdersCmp";


async function getOrders(){
    const res = await import("../../../api/order/getAllOrders/route");

    const orders = await (await res.GET()).json();
  
    return orders.data;
}



export default async function Orders(){

    const orders = await getOrders();

    return(
        <OrdersCmp orders={orders} />
    )
}