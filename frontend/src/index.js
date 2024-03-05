import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import ClientRoot from "./pages/ClientRoot";
import SellerRoot from "./pages/SellerRoot";

import Dashboard from "./pages/seller/Dashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import ItemDetails from "./pages/Details";
import Basket from "./pages/Basket";
import SubmitOrder from "./pages/SubmitOrder";
import CreateOrder from "./pages/seller/CreateOrder";
import OrdersList from "./pages/seller/OrdersList";
import ItemsList from "./pages/ItemsList";
import OrderDetails from "./pages/seller/OrderDetails";
import NotFound from "./pages/NotFound";

import AuthProvider from "./pages/hooks/AuthContext";
import OrderProvider from "./pages/hooks/OrderContext";
import ErrorBoundary from "./pages/hooks/ErrorBoundary"

import { index as routes } from "./routes";
import UpdateItem from "./pages/seller/UpdateItem";

const root = ReactDOM.createRoot(document.getElementById("container"));

const App = () => {
  return (
    <ErrorBoundary>
    <OrderProvider>
    <AuthProvider>
      <Routes>
        <Route element={<ClientRoot />} path={routes.CLIENT.ROOT}>
          <Route index element={<Home />} />
          <Route path={routes.ITEMS.ROOT}>
            <Route element={<ItemsList />} index />
            <Route element={<ItemDetails />} path={routes.ITEMS.DETAILS} />
          </Route>
          <Route path={routes.CLIENT.BASKET} element={<Basket />} />
          <Route path={routes.CLIENT.SUBMIT_ORDER} element={<SubmitOrder />} />
          <Route path={routes.LOGIN} element={<LoginPage />} />
          <Route path={routes.LOGOUT} element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<SellerRoot />} path={routes.SELLER.ROOT}>
          <Route element={<Dashboard />} index path={routes.SELLER.DASHBOARD} />
          {/* <Route path="basket" element={<Basket />} /> */}
          <Route path={routes.ITEMS.ROOT}>
            <Route index element={<ItemsList seller/>} />
            <Route path={routes.ITEMS.DETAILS} element={<ItemDetails seller/>} />
            <Route path={routes.ITEMS.UPDATE} element={<UpdateItem />} />
            <Route path={routes.ITEMS.UPDATE + "/:id"} element={<UpdateItem />} />
          </Route>
          <Route path={routes.SELLER.ORDERS.MAIN}>
            <Route index element={<OrdersList />} />
            <Route
              path={routes.SELLER.ORDERS.CREATE}
              element={<CreateOrder />}
            />
            <Route
              path={routes.SELLER.ORDERS.DETAILS}
              element={<OrderDetails />}
            />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </OrderProvider>
    </ErrorBoundary>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
