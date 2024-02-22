import React, { useEffect, useState } from 'react'
import { addCategory, getCategory } from '../../../services/product';
import Card from '../../card/Card'
import style from '../addProduct/AddProduct.module.scss'
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const StyledDataGrid = styled(DataGrid)({
    // Apply styles to the root element of the DataGrid
    '& .MuiDataGrid-root': {
        // Add your root styles here
        backgroundColor: 'lightgray',
        fontFamily: 'sans-serif', // Example font-family
    },
    '& .MuiDataGrid-columnHeaderTitle': {

        fontSize: "14px"
    },
    // Apply styles to the header element of the DataGrid
    '& .MuiDataGrid-colCell': {
        // Add your header styles here
        backgroundColor: 'gray',
        color: 'white',
    },
    // Apply styles to the cell element of the DataGrid
    '& .MuiDataGrid-cell': {
        // Add your cell styles here
        fontSize: '14px',

    },
    '& .MuiDataGrid-iconSeparator button': {
        cursor: 'pointer', // Display hand cursor by default
        transition: 'background-color 0.3s', // Add transition effect for smooth hover
        padding: '8px', // Add padding for better UX
        borderRadius: '4px', // Add border radius for rounded corners
        border: 'none', // Remove default button border
        backgroundColor: 'transparent', // Set background color as transparent
    },
    // Apply hover styles to the edit button within the DataGrid
    '& .MuiDataGrid-iconSeparator button:hover': {
        backgroundColor: 'lightgray', // Change background color on hover
    },
});

const AddCategory = () => {
    const [catgegoryCOllection,setCatgegoryCOllection]=useState([]);

    const columns = [
        // { field: '_id', headerName: 'ID', width: 150 },
        { field: 'category', headerName: 'Category', width: 250 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <div>
                    {/* <IconButton onClick={() => handleEdit(params.row)}>
                <EditIcon />
              </IconButton> */}
                    <FaPencilAlt style={{ cursor: "pointer" }} />


                </div>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <div>
                    <FaTrashAlt style={{ cursor: "pointer" }} />
                </div>
            ),
        },
    ];

    const [prodcategory, setProdCategory] = useState({
        category: ""
    });
    const getCategoryCollection = async () => {
        try {
            const response = await getCategory();
            setCatgegoryCOllection(response.data)
        } catch (error) {
            console.log(error)
            toast.error(`Error Occured ${error}`)
        }
    }
    useEffect(() => {
        getCategoryCollection();
    }, [])
    const handleCategory = (e) => {
        const { name, value } = e.target;
        setProdCategory((prevData) => ({ ...prevData, [name]: value }))
    }
    const submitCategory = async (e) => {
        e.preventDefault()
        try {
            const response = await addCategory(prodcategory)
            setProdCategory((prevData) => ({ ...prevData, category: "" }));
            getCategoryCollection();
            toast.success("Category addedd successfully")
        } catch (error) {
            toast.error(`Error : ${error}`);
        }
    }
    return (
        <>
            <div className={style.product}>
                <Card cardClass={style.card}>
                    <form onSubmit={submitCategory}>
                        <lable>Category</lable>
                        <input type="text" value={prodcategory.category} name="category" placeholder="Enter Category" required onChange={(e) => handleCategory(e)} />
                        <button type="submit" className="--btn --btn-primary">Submit</button>
                    </form>
                </Card>
                <Card cardClass={style.card}>
                    <StyledDataGrid
                        rows={catgegoryCOllection}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={5}
                    // checkboxSelection
                    // disableSelectionOnClick
                    />

                </Card>
            </div>


        </>
    )
}

export default AddCategory
