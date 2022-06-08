import { useContext, useEffect, useCallback } from "react";

import AvailableMenu from "../../components/Menu/AvailableMenu";
import ModalContext from "../../store/modal-context";
import useHttp from "../../hooks/use-http";
import {
  productGetEdit,
  addNewProduct,
  deleteProduct,
  getProducts,
  updatePostProduct,
} from "../../api/api-product";

const GetAllProdHandler = () => {
  const {
    data: allProduct,
    status: statusLoaded,
    sendingRequest: getAllProd,
  } = useHttp(getProducts, true);

  useEffect(() => {
    getAllProd();
  }, [getAllProd]);

  const changingLoadProd = useCallback(() => {
    getAllProd();
  }, [getAllProd]);

  return {
    allProduct,
    statusLoaded,
    changingLoadProd,
  };
};

const AddProduct = () => {
  const { sendingRequest: sendNewProduct, status: statusAdd } =
    useHttp(addNewProduct);
  const addProductHandler = (dataSend) => {
    sendNewProduct(dataSend);
  };

  return {
    addProductHandler,
    statusAdd,
  };
};

const UpdateProduct = () => {
  const { sendingRequest: sendUpdateProduct, status: statusUpdate } =
    useHttp(updatePostProduct);

  const postEditHandler = (dataProduct) => {
    sendUpdateProduct(dataProduct);
  };

  return {
    postEditHandler,
    statusUpdate,
  };
};

const GetSingleProd = () => {
  const { data: loadedSingleProd, sendingRequest: getSingleProd } =
    useHttp(productGetEdit);
  const editProductHanlder = (id) => {
    getSingleProd(id);
  };

  return {
    loadedSingleProd,
    editProductHanlder,
  };
};

const DeleteSingleProd = () => {
  const { sendingRequest: deleteProd, status: statusDelete } =
    useHttp(deleteProduct);
  const deleteProductHandler = (id) => {
    const isDeleteItem = window.confirm("Are you sure want to delete product?");
    if (isDeleteItem) {
      deleteProd(id);
    }
  };

  return {
    deleteProductHandler,
    statusDelete,
  };
};

const Menu = () => {
  const modalCtx = useContext(ModalContext);

  const hiddenModalHandler = () => {
    modalCtx.hiddenModal();
  };

  const { allProduct, statusLoaded, changingLoadProd } = GetAllProdHandler();

  const { addProductHandler, statusAdd } = AddProduct();

  const { loadedSingleProd, editProductHanlder } = GetSingleProd();

  const { postEditHandler, statusUpdate } = UpdateProduct();

  const { deleteProductHandler, statusDelete } = DeleteSingleProd();

  useEffect(() => {
    if (
      statusDelete === "completed" ||
      statusAdd === "completed" ||
      statusUpdate === "completed"
    ) {
      changingLoadProd();
    }
  }, [statusDelete, statusAdd, statusUpdate, changingLoadProd]);

  return (
    <div style={{ padding: "5% 9%" }}>
      <AvailableMenu
        allProduct={allProduct}
        singleProd={loadedSingleProd}
        status={statusLoaded}
        onPostAdd={addProductHandler}
        onEdit={editProductHanlder}
        onPostEdit={postEditHandler}
        onDelete={deleteProductHandler}
        onHiddenModal={hiddenModalHandler}
        modalIsShow={modalCtx.isShow}
      />
    </div>
  );
};

export default Menu;
