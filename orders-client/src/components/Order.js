const Order = ({order}) => {
    return (
      <div className="card background-card">
        <div className="card-body">
           <h5 className="card-title">{order.orderDescription}</h5>
           <p className="card-text">
             
             € {order.totalPriceInclVat} <br />

             <b>Ordered by: </b> {order.user.firstname + ' ' + order.user.lastname}   
             
             </p>

           <a href="#" className="btn btn-primary">Detail Order</a>
        </div>
      </div>       
    );
}
export default Order;