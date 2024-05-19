'use client'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';



export default function OrdersCmp({orders}){

  const [modalShow, setModalShow] = useState(false);
  const [articles,setArticles] = useState(null);

  const router = useRouter();

    const columns = [
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 150,
        },
        {
          field: 'phone',
          headerName: 'Phone',
          width: 170,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 110,
          },
          {
            field: 'district',
            headerName: 'District',
            width: 110,
          },
          {
            field: 'neighborhood',
            headerName: 'Neighborhood',
            width: 110,
          },
          {
            field: 'total',
            headerName: 'Total',
            type: 'number',
            width: 110,
          },
          {
            field: 'status',
            headerName: 'Status',
            width: 110,
          },
          {
            field: 'createdAt',
            headerName: 'Date',
            width: 110,
          },
      ];

      const [success,setSuccess] = useState(null);

      const [successMessage,setSuccessMessage] = useState("");


      const handleCompleteOrder = async () => {
         const res = await axios.post("/api/order/updateOrder",{id: articles._id})
         .then((response)=>{
          if(response.data.success === true){
             setSuccessMessage("Completed Order Successfully.")
             setSuccess(true);
             setArticles(null);
             setModalShow(false);
             router.refresh();
          }
          else{
            setSuccessMessage("A problem occured while completing order.")
            setSuccess(false);
            setModalShow(false);
          }
         }).catch((e)=>{
          console.log(e);
          setSuccessMessage("A problem occured while completing order.")
          setSuccess(false);
          setModalShow(false);
         })

      }

      const handleDeleteOrder = async () => {
         const res = await axios.post("/api/order/deleteOrder",{id: articles._id})
         .then((response)=>{
          if(response.data.success === true){
             setSuccessMessage("Deleted Order Successfully.")
             setSuccess(true);
             setArticles(null);
             setModalShow(false);
             router.refresh();
          }
          else{
            setSuccessMessage("A problem occured while deleting order.")
            setSuccess(false);
            setModalShow(false);
          }
         }).catch((e)=>{
          console.log(e);
          setSuccessMessage("A problem occured while deleting order.")
          setSuccess(false);
          setModalShow(false);
         })
      }


    return(
      <>
      <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",position:"relative"}}>
      {success === null ? "" :
      success === true ? (
        <Alert style={{position:"absolute",top:"75px",right:"40%"}} icon={<CheckIcon fontSize="inherit" />} severity="success">
      {successMessage}.
    </Alert>
      ) : 
      (
        <Alert style={{position:"absolute",top:"75px",right:"40%"}} severity="error">{successMessage}.</Alert>
      )
      }
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        getRowId={(row)=>row._id}
        columns={columns}
        onRowClick={(row)=>{setModalShow(true);setArticles(row.row)}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>

    <Modal
      show={modalShow}
      onHide={() => {setModalShow(false);setArticles(null)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {articles === null ? "" :
        <div>
         <h6><span className='text-black fw-bold'>Customer :</span>  {articles.fullName}</h6>
         <h6><span className='text-black fw-bold'>email:</span> {articles.email}</h6>
         <h6><span className='text-black fw-bold'>Phone:</span> {articles.phone}</h6>
         <div className='d-flex'>
          <h6 className='me-4'><span className='text-black fw-bold'>City :</span> {articles.city}</h6>
          <h6 className='me-4'><span className='text-black fw-bold'>District :</span> {articles.district}</h6>
          <h6><span className='text-black fw-bold'>Neighborhood :</span> {articles.neighborhood}</h6>
         </div>
         <h6><span className='text-black fw-bold'>Address :</span> {articles.address}</h6>
         <h6><span className='text-black fw-bold'>Date :</span>{articles.createdAt}</h6>
         <h6><span className='text-black fw-bold'>Total :</span> {articles.total}</h6>
         <h6><span className='text-black fw-bold'>Articles :</span> </h6>
         {articles.articles.map((article,index)=>{
          return(
              <div key={index} className='d-flex align-items-center border border-black pt-1'>
                 <h6 className='me-2'><span className='text-black fw-bold'>Article :</span> {article.name}</h6>
                 <h6 className='me-2'><span className='text-black fw-bold'>Color :</span> {article.color}</h6>
                 <h6 className='me-2'><span className='text-black fw-bold'>Size : </span>{article.size}</h6>
                 <h6><span className='text-black fw-bold'>Quantity :</span> {article.quantity}</h6>
              </div>
          )
         })}
         </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button className='me-4' variant='secondary' onClick={()=>{setModalShow(false);setArticles(null)}}>Close</Button>
        {articles === null ? "" : articles.status === "Completed" ? "" : <Button variant='primary' onClick={()=>handleCompleteOrder()}>Complete Order</Button>}
         {articles === null ? "" : articles.status === "Waiting" ? "" : <Button variant='danger' onClick={()=>handleDeleteOrder()}>Delete Order</Button>}
      </Modal.Footer>
    </Modal>
        </div>
        </>
    )
}