"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMaterial = exports.editMaterial = exports.addMaterial = exports.DeleteProduct = exports.editProduct = exports.addProduct = exports.DeleteSupplier = exports.editSupplier = exports.addSupplier = exports.DeleteClient = exports.editClient = exports.addClient = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_model_1 = __importDefault(require("../../models/client.model"));
const supplier_model_1 = __importDefault(require("../../models/supplier.model"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = require("cloudinary");
const products_model_1 = __importDefault(require("../../models/products.model"));
const materials_model_1 = __importDefault(require("../../models/materials.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// let transporter = nodemailer.createTransport({
//   host: 'smtp.sendgrid.net',
//   port: 587,
//   auth: {
//       user: "apikey",
//       pass: process.env.SENDGRID_API_KEY
//   }
// })
var transporter = nodemailer_1.default.createTransport({
    name: 'auverse.com',
    service: 'gmail',
    auth: {
        user: "nexuscompany439@gmail.com",
        pass: process.env.SENDGRID_API_KEY
    }
});
// transporter.sendMail({
//   from: "nexuscompany439@gmail.com", // verified sender email
//   to: `gokuldas439@gmail.com`, // recipient email
//   subject: "Your Credentials", // Subject line
//   text: "Welcome to Board", // plain text body
//   html: `<b>email : </b><br><b>Password : </b>`, // html body
// }, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
// transporter.close();
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
// const sendEmail = {
//   from: 'nexuscompany439@gmail.com',
//   to: 'gokuldas439@gmail.com',
//   subject: 'Sending A Simple Email using Node.js',
//   text: '<html><body>Now is the time for all good men to send Email via Node.js!',
//   html: '<h1>SendGrid Test</h1><p>Now is the time for all good men to send Email via Node.js!</p></body></html>'
// };
// sendgrid.send(sendEmail)
// .then((response) => {
//   console.log('SendGrid Email sent: ' + response)
// })
// .catch((error) => {
//   console.error(error)
// })
// var mailOptions = {
//   from: process.env.EMAIL,
//   to: userDetail.email,
//   subject: 'Thanks for Purchasing from Auverse',
//   text: `Hi ${userDetail.name}, thank you for purchasing from Auverse.
//           Your order ${trackingId.tracking_id} have been confirmed and will be delivered soon...`
//   // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
// };
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//   } else {
//   }
// });
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
exports.addClient = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const companyId = id;
    const { name, email, password, address, location, number } = req.body;
    if (!name || !email || !password || !address || !location || !number) {
        next((0, http_errors_1.default)(400, 'Please input all the fields'));
    }
    else {
        const userExist = await client_model_1.default.findOne({ email, companyId });
        if (!userExist) {
            // Hash password
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            // Create user
            const client = await client_model_1.default.create({
                name,
                email,
                number,
                companyId,
                password: hashedPassword,
                address,
                location,
                isActive: true
            });
            // transporter.sendMail({
            //   from: "nexuscompany439@gmail.com", // verified sender email
            //   to: `${email}`, // recipient email
            //   subject: "Your Credentials", // Subject line
            //   text: "Welcome to Board", // plain text body
            //   html: `<b>email : ${email}</b><br><b>Password : ${password}</b>`, // html body
            // }, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ' + info.response);
            //   }
            // });
            if (client) {
                res.status(201).json({
                    message: "success"
                });
            }
            else {
                res.status(401);
                throw new Error('Invalid Client data....');
            }
        }
        else {
            res.status(401);
            throw new Error(" Client Already Exists....");
        }
    }
});
exports.editClient = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.user;
    console.log(id);
    const companyId = id;
    console.log("entered route");
    const { _id, name, email, address, location, number } = req.body;
    // console.log(req.body)
    if (!_id || !name || !email || !address || !location || !number) {
        // next(createError(401,'Please input all the fields'))
        res.status(401);
        throw new Error('Please input all the fields');
    }
    else {
        console.log(_id);
        const userExist = await client_model_1.default.findOne({ _id });
        const emailExists = await client_model_1.default.findOne({ email, companyId, _id: { $ne: _id } });
        console.log(userExist);
        if (userExist) {
            if (!emailExists) {
                await client_model_1.default.updateOne({ _id: _id }, { name, email, address, location, number });
                res.status(200).json({
                    message: "success",
                });
            }
            else {
                res.status(401);
                throw new Error("Client Email already Exists");
            }
        }
        else {
            res.status(401);
            throw new Error('user doesnot exists');
        }
    }
});
// delete client ..........................................
// interface deleteClient{
//   companyId:mongoose.Types.ObjectId;
// }
exports.DeleteClient = (0, express_async_handler_1.default)(async (req, res) => {
    const { id: clientId } = req.params;
    // const {companyId}=req.body as deleteClient
    if (clientId) {
        const userExists = await client_model_1.default.findById(clientId);
        if (userExists) {
            await client_model_1.default.deleteOne({ _id: clientId });
            res.status(200).json({
                status: "success",
                message: "Client had been deleted successfully..",
            });
        }
        else {
            res.status(401);
            throw new Error("Something went wrong...");
        }
    }
    else {
        res.status(401);
        throw new Error("user Doesnot exists....");
    }
});
exports.addSupplier = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const companyId = _id;
    const { name, email, password, address, location, number } = req.body;
    // || !materialId
    if (!name || !email || !password || !address || !location || !number) {
        res.status(401);
        throw new Error('Please input all the fields');
    }
    else {
        const supplierExist = await supplier_model_1.default.findOne({ email, companyId });
        if (!supplierExist) {
            // Hash password
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            // Create supplier
            const supplier = await supplier_model_1.default.create({
                name,
                email,
                number,
                password: hashedPassword,
                address,
                location,
                materialId: 'wood',
                companyId,
                isActive: true
            });
            if (supplier) {
                res.status(201).json({
                    message: "success"
                });
            }
            else {
                res.status(401);
                throw new Error('Invalid Supplier data...');
            }
        }
        else {
            res.status(401);
            throw new Error(' Supplier already exist...');
        }
    }
});
exports.editSupplier = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.user;
    const companyId = id;
    console.log(req.body);
    const { _id, name, email, address, location, 
    // material,
    number,
    // companyId
     } = req.body;
    const supplierId = _id;
    // || !material || !companyId
    if (!name || !email || !address || !location || !number) {
        res.status(401);
        throw new Error('Please input all the fields');
    }
    else {
        const userExist = await supplier_model_1.default.findOne({ _id: supplierId });
        const emailExists = await supplier_model_1.default.findOne({ email, companyId, _id: { $ne: supplierId } });
        if (userExist) {
            if (!emailExists) {
                await supplier_model_1.default.updateOne({ _id: supplierId }, { name, email, address, location, number });
                res.status(200).json({
                    message: "success",
                });
            }
            else {
                res.status(401).json({
                    message: "Supplier Email already Exists",
                });
            }
        }
        else {
            res.status(401).json({
                message: "Supplier doesnot Exists",
            });
        }
    }
});
// delete supplier ..........................................
exports.DeleteSupplier = (0, express_async_handler_1.default)(async (req, res) => {
    const { id: supplierId } = req.params;
    const userExists = await supplier_model_1.default.findById(supplierId);
    if (userExists) {
        await supplier_model_1.default.deleteOne({ _id: supplierId });
        res.status(200).json({
            status: "success",
            message: "Supplier had been deleted successfully..",
        });
    }
    else {
        res.status(401);
        throw new Error("Supplier doesnot exists...");
    }
});
exports.addProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    console.log("material");
    console.log(JSON.stringify(req.body.materialId));
    const companyId = id;
    const { name, color, description, materialId, price, stock } = req.body;
    console.log(materialId);
    if (!name || !color || !description || !materialId || !price || !stock) {
        res.status(400);
        throw new Error("Enter the Required Fields");
    }
    else {
        const files = req.files;
        console.log(files);
        // 
        const urls = await Promise.all(files.map(async (file) => {
            const { path } = file;
            //  main line for uploading..........
            try {
                const result = await cloudinary_1.v2.uploader.upload(file.path);
                return result.secure_url;
            }
            catch (err) {
                console.log(err);
            }
            // 
            // 
        }));
        let newprice = parseInt(price);
        // let newFinalprice=parseInt(finalprice)
        let newStock = parseInt(stock);
        const product = await products_model_1.default.create({
            companyId,
            name,
            color,
            description,
            finalprice: newprice,
            materialId,
            price: newprice,
            images: urls,
            stock: newStock,
            isDeleted: false
        });
        if (product) {
            res.status(200).json({
                message: "success"
            });
        }
        else {
            res.status(400);
            throw new Error('something went wrong...');
        }
    }
});
exports.editProduct = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.user;
    const companyId = id;
    const { productId, name, price, color, description, stock, materialId, } = req.body;
    if (!name || !price || !color || !description || !stock || !materialId || !productId) {
        res.status(401);
        throw new Error('Please input all the fields');
    }
    else {
        const productExist = await products_model_1.default.findOne({ _id: productId, companyId });
        // const emailExists = await ProductModel.findOne({ email,companyId,_id:{ $ne: productId } });
        if (productExist) {
            const files = req.files;
            console.log(files);
            // 
            const urls = await Promise.all(files.map(async (file) => {
                const { path } = file;
                //  main line for uploading..........
                try {
                    const result = await cloudinary_1.v2.uploader.upload(file.path);
                    return result.secure_url;
                }
                catch (err) {
                    console.log(err);
                }
                // 
                // 
            }));
            let newprice = parseInt(price);
            let newStock = parseInt(stock);
            await products_model_1.default.updateOne({ _id: productId }, {
                companyId,
                productId,
                name,
                color,
                description,
                finalprice: newprice,
                materialId,
                price: newprice,
                images: urls,
                stock: newStock
            });
            res.status(200).json({
                message: "success",
            });
        }
        else {
            res.status(401).json({
                message: "product doesnot Exists",
            });
        }
    }
});
exports.DeleteProduct = (0, express_async_handler_1.default)(async (req, res) => {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        // Get token from header
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        // Verify token
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const companyId = id;
        const productId = req.body;
        const productExists = await products_model_1.default.findOne({ _id: productId, companyId: companyId });
        if (productExists) {
            await products_model_1.default.deleteOne({ _id: productId });
            res.status(200).json({
                status: "success",
                message: "product had been deleted successfully..",
            });
        }
        else {
            res.status(401);
            throw new Error("product doesnot exists...");
        }
    }
    else {
        res.status(401);
        throw new Error('Product not found');
    }
});
exports.addMaterial = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.user;
    const companyId = id;
    const { name, unit, description, price, stock, } = req.body;
    if (!name || !unit || !description || !price || !stock) {
        res.status(400);
        throw new Error("Enter the Required Fields");
    }
    else {
        //   const files = req.files as Express.Multer.File[];
        //   console.log(files)
        //   // 
        //   const urls =  await Promise.all(files.map(async (file) => {
        //     const { path } = file;
        // //  main line for uploading..........
        // try{
        //   const result = await cloudinary.uploader.upload(file.path)
        //   return result.secure_url;
        // }
        // catch(err){
        //   console.log(err)
        // }
        //   // 
        //     // 
        //   }));
        let newprice = parseInt(price);
        // let newFinalprice=parseInt(finalprice)
        let newStock = parseInt(stock);
        const product = await materials_model_1.default.create({
            name,
            price: newprice,
            finalprice: newprice,
            unit,
            description,
            stock: newStock,
            companyId
        });
        if (product) {
            res.status(200).json({
                message: "success"
            });
        }
        else {
            res.status(401);
            throw new Error('something went wrong');
        }
    }
});
exports.editMaterial = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const companyId = id;
    const { _id, name, price, unit, description, stock, images, } = req.body;
    const materialId = _id;
    if (!name || !price || !unit || !description || !stock || !materialId) {
        res.status(401);
        throw new Error('Please input all the fields');
    }
    else {
        const materialExist = await materials_model_1.default.findOne({ _id: materialId, companyId });
        // const emailExists = await ProductModel.findOne({ email,companyId,_id:{ $ne: productId } });
        if (materialExist) {
            let newprice = parseInt(price);
            // let newFinalprice=parseInt(finalprice)
            let newStock = parseInt(stock);
            await materials_model_1.default.updateOne({ _id: materialId, companyId }, {
                name,
                unit,
                description,
                finalprice: newprice,
                price: newprice,
                stock: newStock
            });
            res.status(200).json({
                message: "success",
            });
        }
        else {
            res.status(401).json({
                message: "material doesnot Exists",
            });
        }
    }
});
// delete material.....................................................................
exports.DeleteMaterial = (0, express_async_handler_1.default)(async (req, res) => {
    const { id: materialId } = req.params;
    const materialExists = await materials_model_1.default.findById(materialId);
    if (materialExists) {
        await materials_model_1.default.deleteOne({ _id: materialId });
        res.status(200).json({
            status: "success",
            message: "product had been deleted successfully..",
        });
    }
    else {
        res.status(401);
        throw new Error("product doesnot exists...");
    }
});
