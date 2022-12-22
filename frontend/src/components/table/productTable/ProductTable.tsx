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
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProduct } from "../../../types/login/loginApi";

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
  productId?:string
  _id?: string;
  name?: string;
  price?: string;
  finalprice?: number;
  color?: string;
  description?: string;
  stock?: string;
  images?: Array<string>;
  materialId?: Edit[];
}
interface Edit {
  name?: string;
  materialId?: string;
}

interface MaterialProp {
  name: string;
  _id: string;
}

interface Mater {
  value: string;
  label: string;
}

function ProductTable() {
  const [selectedOptions, setSelectedOptions] = useState<Mater[]>();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<StateProperties>({});
  const [addSelectedUser, setAddSelectedUser] = useState<StateProperties>({});
  const [MaterialData, setMaterialData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setdeleteShow] = useState(false);

  const [productInfo, setProductInfo] = useState({
    file: [],
    filepreview: [""],
  });
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const animatedcomponents = makeAnimated();








  const onSubmit=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    try {
      console.log("first");
      e.preventDefault();
      console.log(selectedUser)
      const { _id,name, price, description, stock , color} = selectedUser;
      if( !_id || !name || !price || !description || !stock || !color ){
          console.log("insided")
          toast.error("Enter All the Required Fields");
          
      }else{
        const formdata = new FormData();
        formdata.append('productId',_id)
        formdata.append("name", name);
        formdata.append("price", price);
        formdata.append("color", color);
        formdata.append("description", description);
        formdata.append("stock", stock);
        formdata.append("images", imageData[0]);
        formdata.append("images", imageData[1]);
        formdata.append("images", imageData[2]);
        formdata.append("images", imageData[3]);

        selectedOptions?.forEach((element) => {
          console.log(element);
          formdata.append("materialId", element.value);
        });
    
     
      const config = {
        headers: {
          Authorization: `Bearer ${companyData.token}`,
        },
      };
      const res = await axios.patch(
        "http://127.0.0.1:5000/company/editProduct",
        formdata,
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
  }



  const handleOpen = (user: any) => {
    console.log({user});
    console.log("huhhhuh");
    setSelectedUser(user);
    console.log(selectedUser);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  // const token = useSelector((state) =>   state.company.data);

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
        "http://127.0.0.1:5000/company/getProducts",
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

  const fetchMaterials = async () => {
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
      let datas = data.data.map((data: MaterialProp) => ({
        value: data._id,
        label: data.name,
      }));
      setIsLoading(false);
      setMaterialData(datas);
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
    fetchMaterials();
  }, []);

  // const [options]=MaterialData
  // console.log("first",options)
  const handleSelect = () => {
    console.log(selectedOptions);
  };

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

  const handleMaterials = (item: any) => {
    // console.log(item)
    setSelectedOptions(item);
    console.log(selectedOptions);
  };

  const onAddSubmit = async (e: any) => {
    try {
      console.log("first");
      e.preventDefault();
      const { name, price, color, description, stock } = addSelectedUser;
      if (!name || !price || !color || !description || !stock) {
        console.log(imageData);
        console.log("insided");
        toast.error("Enter All the Required Fields");
      } else {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("price", price);
        formdata.append("color", color);
        formdata.append("description", description);
        formdata.append("stock", stock);
        formdata.append("images", imageData[0]);
        formdata.append("images", imageData[1]);
        formdata.append("images", imageData[2]);
        formdata.append("images", imageData[3]);

        selectedOptions?.forEach((element) => {
          console.log(element);
          formdata.append("materialId", element.value);
        });

        // const ProductData = {
        //     name,
        //     price,
        //     color,
        //     description,
        //     stock,
        //     images:imageData,
        //     materialId:selectedOptions
        // };
        // console.log(ProductData)
        const config = {
          headers: {
            Authorization: `Bearer ${companyData.token}`,
          },
        };
        const res = await axios.post(
          "http://127.0.0.1:5000/company/addProduct",
          formdata,
          config
        );
        console.log(res);
        if (res.data.message === "success") {
          setShow(false);
          toast.success("Product has been Created successfully...");
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
    console.log(selectedUser);
  };

  // console.log({selectedUser})

  

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
        toast.success("Supplier has been Created successfully....");
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

  // const image=(e: any)=>{
  //   console.log(e.target.files)
  // const formData=new FormData()
  // formData.append("images",e.target.files)
  // console.log(formData)
  //  }

  //  const formData=new FormData()

  const handleInputChange = (e: any) => {
    console.log(e.target.files);
    if (e.target.files.length == 4) {
      setProductInfo({
        ...productInfo,
        file: e.target.files[0],
        filepreview: [
          URL.createObjectURL(e.target.files[0]),
          URL.createObjectURL(e.target.files[1]),
          URL.createObjectURL(e.target.files[2]),
          URL.createObjectURL(e.target.files[3]),
        ],
      });
      // formData.append("images",e.target.files)
      setImageData(e.target.files);
    } else {
      toast.error("please select 4 images for product");
    }
  };

  return (
    <>
      {isLoading && <PreLoader />}
      {data && (
        <>
          <Button
            onClick={() => setShow(true)}
            style={{ marginBottom: "10px", border: "none" }}
          >
            ADD PRODUCT
          </Button>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>images</th>
                <th>Price</th>
                <th>color</th>
                <th>description</th>
                <th>Stock</th>
                <th>materialsUsed</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: any, i: any) => (
                <tr key={user?._id}>
                  <td>{i + 1}</td>
                  <td>{user?.name}</td>
                  {/* <td>{user?.images}</td> */}
                  <td>
                    {user ? (
                      <img
                        style={{ height: "40px" }}
                        src={user.images[0]}
                      ></img>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>₹ {user?.price}</td>
                  <td> {user?.color}</td>
                  <td>{user?.description}</td>
                  <td>{user?.stock}</td>
                  <td>
                    {user?.materialId.map((material: any) => (
                      <>
                        <span>{material.name}</span>
                        <br></br>
                      </>
                    ))}
                  </td>
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
                  <td
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      border: "none",
                    }}
                  >
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
                  EDIT Product
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 3 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                    name="_id"
                    hidden
                    onChange={(e) => onChange(e)}
                    label="Name"
                    variant="outlined"
                    defaultValue={selectedUser?._id}
                  />
                  <TextField
                    id="outlined-basic"
                    name="name"
                    onChange={(e) => onChange(e)}
                    label="Name"
                    variant="outlined"
                    defaultValue={selectedUser?.name}
                  />
                  <TextField
                    id="outlined-basic"
                    name="price"
                    onChange={(e) => onChange(e)}
                    label="price"
                    variant="outlined"
                    defaultValue={selectedUser?.price}
                  />
                  <TextField
                    id="outlined-basic"
                    name="color"
                    onChange={(e) => onChange(e)}
                    label="color"
                    variant="outlined"
                    defaultValue={selectedUser?.color}
                  />
                  <TextField
                    id="outlined-basic"
                    name="description"
                    onChange={(e) => onChange(e)}
                    label="description"
                    variant="outlined"
                    defaultValue={selectedUser?.description}
                  />
                  <TextField
                    id="outlined-basic"
                    name="stock"
                    onChange={(e) => onChange(e)}
                    label="stock"
                    variant="outlined"
                    defaultValue={selectedUser?.stock}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Materials Used :"
                    variant="filled"
                    disabled
                    defaultValue={
                      selectedUser?.materialId?.length
                        ? selectedUser.materialId.map((material) => (
                           
                              material.name
                          ))
                        : null
                    }
                  />
                  <Select
                    isMulti
                    components={animatedcomponents}
                    onChange={(item: any) => handleMaterials(item)}
                    options={MaterialData}
                    isClearable={true}
                    isLoading={false}
                    isSearchable={true}
                    placeholder={"Select the Materials used * : "}
                  />

                  {/* <div> */}
                  <input
                    type="file"
                    name="files"
                    onChange={(e) => handleInputChange(e)}
                    multiple
                  ></input>
                  <br></br>
                  <Box style={{ display: "flex", gap: "10px" }}>
                    {productInfo.filepreview !== null
                      ? productInfo.filepreview.map((filepreview) => (
                          <img
                            style={{ width: "80px", height: "60px" }}
                            className="previewimg"
                            src={filepreview}
                            alt={"select images"}
                          />
                        ))
                      : null}

                  </Box>
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
                  ADD PRODUCT
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                      label="Color *"
                      variant="outlined"
                      name="color"
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

                    <Select
                      isMulti
                      components={animatedcomponents}
                      onChange={(item: any) => handleMaterials(item)}
                      options={MaterialData}
                      isClearable={true}
                      isLoading={false}
                      isSearchable={true}
                      placeholder={"Select the Materials used * : "}
                    />

                    {/* <div> */}
                    <input
                      type="file"
                      name="files"
                      onChange={(e) => handleInputChange(e)}
                      multiple
                    ></input>
                    <br></br>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {productInfo.filepreview !== null
                        ? productInfo.filepreview.map((filepreview) => (
                            <img
                              style={{ width: "80px", height: "60px" }}
                              className="previewimg"
                              src={filepreview}
                              alt={"select images"}
                            />
                          ))
                        : null}
                    </div>

                    {/* </div> */}

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
        </>
      )}
    </>
  );
}

export default ProductTable;
