export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/admin","/api/order/getAllOrders"],
  }