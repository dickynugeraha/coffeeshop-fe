import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./store/modal-context";
import { AuthContextProvider } from "./store/auth-context";
import { OrderContextProvider } from "./store/order-context";
import { ProductContextProvider } from "./store/product-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <ModalContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </ModalContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
