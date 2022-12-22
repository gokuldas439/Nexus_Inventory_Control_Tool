import axios from "axios";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { RootState, store } from "../../../redux/App/store";
import { useSelector } from "react-redux";
import PreLoader from "../../PreLoader/PreLoader";
import Button from "react-bootstrap/Button";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { Table } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  interface StateProperties {
    _id?: string;
    name?: string;
    price?: string;
    finalprice?: number;
    unit?: string;
    description?: string;
    stock?: boolean;
  }



function MaterialTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<StateProperties>({});
    const [addSelectedUser, setAddSelectedUser] = useState<StateProperties>({});
  
    const [show, setShow] = useState(false);
    const [deleteShow, setdeleteShow] = useState(false);
  
    const [operation, setOperation] = useState();
  
    const [open, setOpen] = useState(false);
    const handleOpen = (user: any) => {
      console.log(user);
      console.log("huhhhuh");
      setSelectedUser(user);
      console.log(selectedUser);
      setOpen(true);
    };
  
    const handleClose = () => setOpen(false);
    // const token = useSelector((state) =>   state.company.data);
  
    const [deleteOpen, setDeleteOpen] = useState(false);
  
    const handleShowClose = () => {
      setShow(false);
    };
  
    const companyData = useSelector((state: RootState) => state.companyAuth.data);
  
    // console.log(companyData);
  
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${companyData.token}`,
          },
        };
        const { data } = await axios.get(
          "http://127.0.0.1:5000/company/getMaterials",
          config
        );
        console.log(data.data);
        setIsLoading(false);
        setData(data.data);
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleDelete = (data: any) => {
      setSelectedUser(data);
      // setOperation("delete");
      console.log(data);
      setdeleteShow(true);
    };
  
    const handleEdit = (data: any) => {
      setSelectedUser(data);
      // setOperation("edit");
      console.log(data);
      setShow(true);
    };
  
    const onAddChange = (e: any) => {
      setAddSelectedUser((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      console.log(addSelectedUser);
    };
  
    const onAddSubmit = async (e: any) => {
      try {
        console.log("first");
        e.preventDefault();
        const { name, price, unit, description, stock } = addSelectedUser;
        if(!name || !price || !unit || !description || !stock){
            console.log("insided")
            toast.error("Enter All the Required Fields");
            
        }else{

        const MaterialData = {
            name,
            price,
             unit,
            description,
            stock
        };
        console.log(MaterialData)
        const config = {
          headers: {
            Authorization: `Bearer ${companyData.token}`,
          },
        };
        const res = await axios.post(
          "http://127.0.0.1:5000/company/addMaterial",
          MaterialData,
          config
        );
        console.log(res);
        if (res.data.message === "success") {
          setShow(false);
          toast.success("Material has been Created successfully...");
          setIsLoading(true);
          fetchData();
          setIsLoading(false);
        }
    }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };
  
    const onChange = (e: any) => {
      console.log("console");
      setSelectedUser((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      console.log(selectedUser)
    };
  
    // console.log({selectedUser})
  
    const onSubmit = async (e: any) => {
      try {
        console.log("first");
        e.preventDefault();
        console.log(selectedUser)
        const { _id,name, price, unit, description, stock } = selectedUser;
        if( !_id || !name || !price || !unit || !description || !stock){
            console.log("insided")
            toast.error("Enter All the Required Fields");
            
        }else{
            
        console.log("newwwww")
        const userData = {
           _id , name, price, unit, description, stock
        };
        const config = {
          headers: {
            Authorization: `Bearer ${companyData.token}`,
          },
        };
        const res = await axios.patch(
          "http://127.0.0.1:5000/company/editMaterial",
          userData,
          config
        );
        console.log(res);
        if (res.data.message === "success") {
          setOpen(false);
          toast.success("Material Has been Edited Successfully");
          setIsLoading(true);
          fetchData();
          setIsLoading(false);
        }
    }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };
  
    const deleteUserclick = async (e: any) => {
      try {
        e.preventDefault();
        const { _id } = selectedUser;
        const userData = {
          _id,
        };
        const res = await axios.post(
          "http://localhost:5000/company/deleteSeller",
          userData
        );
        if (res.data.status === "success") {
          setdeleteShow(false);
          toast.success('Supplier has been Created successfully....');
          setIsLoading(true);
          fetchData();
          setIsLoading(false);
        }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    };
  
    // const handleOpen = () => setShow(true);
    // const handleClose = () => setShow(false);
    const deletehandleClose = () => setdeleteShow(false);
  return (
    <>
    {isLoading && <PreLoader />}
    {data && (
      <>
       <Button onClick={() => setShow(true)} style={{marginBottom:'10px',border:'none'}}>ADD MATERIAL</Button>
      
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Unit</th>
              <th>description</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: any, i: any) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.price}</td>
                <td>per {user?.unit}</td>
                <td>{user?.description}</td>
                <td>{user?.stock}</td>
                <td>
                  <button
                    className="btn btn-primary "
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      handleOpen(user);
                    }}
                  >
                    {/* <i className="fa fa-pencil" ></i> */}
                    <EditIcon />
                  </button>
                </td>
                <td style={{ justifyContent: "center", display: "flex" }}>
                  <button
                    className="btn"
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(user)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{}}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4">
                EDIT Material
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 3 }}/>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 3}}
                >
                  {/* <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    defaultValue={selectedUser?._id}
                    onChange={onChange}
                  /> */}
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    defaultValue={selectedUser?.name}
                    onChange={onChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="price"
                    variant="outlined"
                    name="price"
                    defaultValue={selectedUser?.price}
                    onChange={onChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="unit"
                    variant="outlined"
                    name="unit"
                    defaultValue={selectedUser?.unit}
                    onChange={onChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="description"
                    variant="outlined"
                    name="description"
                    defaultValue={selectedUser?.description}
                    onChange={onChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="stock"
                    variant="outlined"
                    name="stock"
                    defaultValue={selectedUser?.stock}
                    onChange={onChange}
                  />
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      style={{ backgroundColor: "red", border: "none" }}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ border: "none" }}
                      onClick={(e) => onSubmit(e)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              {/* </Typography> */}
            </Box>
          </Modal>
        </div>


        <div>
          <Modal
            open={show}
            onClose={handleShowClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{}}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4">
                ADD MATERIAL
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Name *"
                    variant="outlined"
                    name="name"
                    onChange={onAddChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Price *"
                    variant="outlined"
                    name="price"
                    onChange={onAddChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Unit *"
                    variant="outlined"
                    name="unit"
                    onChange={onAddChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Description *"
                    variant="outlined"
                    name="description"
                    onChange={onAddChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Stock *"
                    variant="outlined"
                    name="stock"
                    onChange={onAddChange}
                  />
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Button
                      style={{ backgroundColor: "red", border: "none" }}
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ border: "none" }}
                      onClick={(e) => onAddSubmit(e)}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Typography>
            </Box>
          </Modal>
        </div>

        {/* <div>
    <Button variant="outlined" onClick={handleDeleteOpen}>
      Slide in alert dialog
    </Button>
    <Dialog
      open={deleteOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you Sure Want to Delete The User
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose}>Disagree</Button>
        <Button onClick={handleDeleteClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  </div> */}

        {/* <Modal
          show={show}
          onHide={handleClose}
          style={{ background: "#000" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser?.name}
                  autoFocus
                  name="name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser?.email}
                  name="email"
                  onChange={onChange}
                />
              </Form.Group>

              <Button className="btn-secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className="btn-primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal> */}

        {/* <Modal show={deleteShow} onHide={deletehandleClose}>
          <Modal.Header>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            this action will delete the user : {selectedUser?.email}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={deletehandleClose}>Close</Button>
            <Button onClick={deleteUserclick}>Delete</Button>
          </Modal.Footer>
        </Modal> */}
      </>
    )}
  </>
  )
}

export default MaterialTable