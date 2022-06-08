import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./store/modal-context";
import { AuthContextProvider } from "./store/auth-context";
import { PermOrderContextProvider } from "./store/permOrder-context";
import { ProductContextProvider } from "./store/product-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductContextProvider>
        <ModalContextProvider>
          <PermOrderContextProvider>
            <App />
          </PermOrderContextProvider>
        </ModalContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
