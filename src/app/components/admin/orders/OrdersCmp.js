'use client'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function OrdersCmp({orders}){

    const columns = [
        {
          field: 'fullName',
          headerName: 'Full name',
          width: 150,
        },
        // {
        //   field: 'lastName',
        //   headerName: 'Last name',
        //   width: 150,
        //   editable: true,
        // },
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

        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        // },
      ];


    return(
      <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        getRowId={(row)=>row._id}
        columns={columns}
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
        </div>
    )
}