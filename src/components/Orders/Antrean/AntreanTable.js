import "../../UI/Table2.css";
import TableItem from "../TableItem";

const AntreanTable = (props) => {
  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th className="title">Name</th>
            <th className="title">Status</th>
            <th className="title">Eat By</th>
            <th className="title">Table Number</th>
            <th className="title">Payment Method</th>
            <th className="title">Date Order</th>
            <th className="title">All price</th>
            <th className="title">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.orders?.map((item) => (
            <tr key={item.orderId}>
              <TableItem
                order={{
                  name: item.name,
                  status: item.status,
                  eat_by: item.eat_by,
                  table_number: item.table_number,
                  payment_method: item.payment_method,
                  date_order: item.date_order,
                  allPrice: item.allPrice,
                  userId: item.userId,
                  orderId: item.orderId,
                }}
                onDetail={props.onDetail}
                onChangeStatus={props.onChangeStatus}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AntreanTable;
