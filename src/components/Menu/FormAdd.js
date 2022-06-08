import { useRef, useState, useId } from "react";

const FormAdd = (props) => {
  const id = useId();
  const { onPostAdd, onCloseForm } = props;

  // input entered
  const [imgUrl, setImgUrl] = useState(null);
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const typeRef = useRef();

  const valueImage = (e) => {
    setImgUrl(e.target.files[0]);
  };

  const submitFormAddHandler = (e) => {
    e.preventDefault();

    const titleValue = titleRef.current.value;
    const priceValue = priceRef.current.value;
    const descValue = descRef.current.value;
    const typeValue = typeRef.current.value;

    const dataSend = {
      title: titleValue,
      price: priceValue,
      description: descValue,
      type: typeValue,
      img: imgUrl,
    };

    onPostAdd(dataSend);
    onCloseForm();
  };
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          textTransform: "uppercase",
        }}
      >
        Add Menu
      </h2>
      <form onSubmit={submitFormAddHandler}>
        <div className="form-control">
          <label htmlFor={"title" + id}>Title</label>
          <input required type="text" id={"title" + id} ref={titleRef} />
        </div>
        <div className="form-control">
          <label htmlFor={"price" + id}>Price</label>
          <input required type="text" id={"price" + id} ref={priceRef} />
        </div>
        <div className="form-control">
          <label htmlFor={"description" + id}>Description</label>
          <input required type="text" id={"description" + id} ref={descRef} />
        </div>
        <div className="form-control">
          <label htmlFor={"type" + id}>Type</label>
          <select id={"type" + id} ref={typeRef}>
            <option value="Coffee">Coffee</option>
            <option value="Main Course">Main Course</option>
            <option value="Dissert">Dissert</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor={"imageUrl" + id}>Image Url</label>
          <input
            type="file"
            name=""
            id={"imageUrl" + id}
            onChange={valueImage}
          />
        </div>
        <div className="form-control">
          <div
            className={`action`}
            style={{ marginTop: "2rem", textAlign: "left" }}
          >
            <button style={{ backgroundColor: "##bb8760" }}>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAdd;
