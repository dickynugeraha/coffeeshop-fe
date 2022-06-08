import React, { useId, useState } from "react";
import Modal from "../UI/Modal";

const FormEdit = (props) => {
  const id = useId();
  const { singleProd, onPostEdit } = props;

  // input entered
  const [titleEntered, setTitleEntered] = useState(singleProd.title);
  const [priceEntered, setPriceEntered] = useState(singleProd.price);
  const [descEntered, setDescEntered] = useState(singleProd.description);
  const [typeChange, setTypeChange] = useState(singleProd.type);
  const [stockChange, setStockChange] = useState(singleProd.stock);
  const [imageUrl, setImageUrl] = useState(singleProd.imageUrl);

  const valueImage = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const submitProductHandler = (e) => {
    e.preventDefault();

    const dataSend = {
      id: singleProd.id,
      title: titleEntered,
      price: priceEntered,
      description: descEntered,
      type: typeChange,
      isAvailable: stockChange === "1" ? true : false,
      img: imageUrl,
    };

    onPostEdit(dataSend);
    props.onHiddenModal();
  };

  return (
    <Modal forComponent="cart" onHiddenModal={props.onHiddenModal}>
      <div style={{ padding: "2rem" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            textTransform: "uppercase",
          }}
        >
          Edit Menu
        </h2>
        <form onSubmit={submitProductHandler}>
          <div className="form-control">
            <label htmlFor={"title" + id}>Title</label>
            <input
              required
              type="text"
              id={"title" + id}
              onChange={(e) => setTitleEntered(e.target.value)}
              value={titleEntered}
            />
          </div>
          <div className="form-control">
            <label htmlFor={"price" + id}>Price</label>
            <input
              required
              type="text"
              id={"price" + id}
              onChange={(e) => setPriceEntered(e.target.value)}
              value={priceEntered}
            />
          </div>
          <div className="form-control">
            <label htmlFor={"description" + id}>Description</label>
            <input
              required
              type="text"
              id={"description" + id}
              onChange={(e) => setDescEntered(e.target.value)}
              value={descEntered}
            />
          </div>
          <div className="form-control" style={{ display: "flex" }}>
            <div>
              <label htmlFor={"type" + id}>Type</label>
              <select
                required
                id={"type" + id}
                onChange={(e) => setTypeChange(e.target.value)}
                style={{ maxWidth: "9rem" }}
              >
                <option
                  value="Coffee"
                  defaultValue={typeChange === "Coffee" ? true : false}
                >
                  Coffee
                </option>
                <option
                  value="Main Course"
                  defaultValue={typeChange === "Main Course" ? true : false}
                >
                  Main Course
                </option>
                <option
                  value="Dissert"
                  defaultValue={typeChange === "Dissert" ? true : false}
                >
                  Dissert
                </option>
              </select>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <label htmlFor={"type" + id}>Stock</label>
              <select
                required
                id={"type" + id}
                onChange={(e) => setStockChange(e.target.value)}
                style={{ maxWidth: "9rem" }}
              >
                <option
                  value="1"
                  defaultValue={stockChange === true ? true : false}
                >
                  Available
                </option>
                <option
                  value="0"
                  defaultValue={stockChange === true ? true : false}
                >
                  Not Available
                </option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor={"imageUrl" + id}>Image </label>
            <input
              required
              type="file"
              name=""
              id={"imageUrl" + id}
              onChange={valueImage}
            />
          </div>
          <div className="form-control">
            <div className={`action`} style={{ marginTop: "1.2rem" }}>
              <button style={{ backgroundColor: "#36304a" }}>
                {singleProd ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormEdit;
