import axiosApiInstance from '../../util/axiosInstance';
import { useState, useEffect } from 'react';
import Order from './../Order';

import './orderlist.css'


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getOrders(1);
   }, [])


    const getOrders =  async (page = 1, pageSize = 4) => {
        try {
            const res = await axiosApiInstance.get(`/api/orders/paging?page=${page}&pageSize=${pageSize}`)
            
            if(res.status === 200){
                setOrders(res.data);
            }

    
        } catch (error) {
            
        }
    }

    const onPreviousPage = async () => {
        const previousPage = currentPage - 1;
 
        if(previousPage < 1){
            setCurrentPage(1)
        }
        else {
            setCurrentPage(previousPage)
            getOrders(previousPage)
        }
     }
 
     const onNextPage = async () => {
         const nextPage = currentPage + 1;
  
             setCurrentPage(nextPage)
             getOrders(nextPage)
      }


    return (
        <>
        <div class="row container">
            <div class="col-3">
              <p>{orders.length} orders found.</p>

              <p>The current page is : {currentPage}</p>
            </div>

            <div class="col">
               <button class="btn btn-primary" onClick={onPreviousPage} >Previous</button>
                  &nbsp;&nbsp;
               <button class="btn btn-primary" onClick={onNextPage} disabled={orders.length < 1}>Next</button>
            </div>
 


         
        </div>
     
         <div className="flex-grid">

            {orders.map((order, index)=> {
              return (
              <div className="col" key={index} >
                   <Order order={order} />
             </div>
         );
        })}

</div>
        </>
 
    );
    

}


export default OrderList;
