const CLIENT = {
    ROOT: "/",
    DETAILS: "details",
    SUBMIT_ORDER: "submit-order",
    BASKET: "basket",
  },
  SELLER = {
    ROOT: "/seller",
    DASHBOARD: "dashboard",
    ORDERS: {
      MAIN: "orders",
      DETAILS: ":id",
      CREATE: "create",
    },
  };

const index = {
  HOME: "/",
  ITEMS: {
    ROOT: "items",
    UPDATE: "update",
    DETAILS: ":id",
  },
  LOGIN: "/login",
  LOGOUT: "/logout",
  CLIENT,
  SELLER,
};

const routes = {
  CLIENT_MAIN: CLIENT.ROOT,
  CLIENT_DETAILS: CLIENT.ROOT + index.ITEMS.ROOT + "/" + index.ITEMS.ROOT,
  CLIENT_SUBMIT_ORDER: CLIENT.ROOT + CLIENT.SUBMIT_ORDER,
  CLIENT_BASKET: CLIENT.ROOT + CLIENT.BASKET,
  SELLER_DASHBOARD: SELLER.ROOT + "/" + SELLER.DASHBOARD,
  SELLER_ORDERS_MAIN: SELLER.ROOT + "/" + SELLER.ORDERS.MAIN,
  SELLER_ORDER_DETAILS:
    SELLER.ROOT + "/" + SELLER.ORDERS.MAIN + "/" + SELLER.ORDERS.DETAILS,
  SELLER_ORDER_CREATE:
    SELLER.ROOT + "/" + SELLER.ORDERS.MAIN + "/" + SELLER.ORDERS.CREATE,
  CLIENT_ITEMS: index.ITEMS.ROOT,
  CLIENT_ITEM_DETAILS: index.ITEMS.ROOT + "/" + index.ITEMS.DETAILS,
  SELLER_ITEMS: index.SELLER.ROOT + "/" + index.ITEMS.ROOT,
  SELLER_ITEM_DETAILS:
    index.SELLER.ROOT + "/" + index.ITEMS.ROOT + "/" + index.ITEMS.DETAILS,
  SELLER_UPDATE_ITEM:
    index.SELLER.ROOT + "/" + index.ITEMS.ROOT + "/" + index.ITEMS.UPDATE,
  LOGIN: index.LOGIN,
  LOGOUT: index.LOGOUT,
};

export default routes;
export { index };
