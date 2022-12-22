"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.getMaterials = exports.getSuppliers = exports.getClients = exports.companylogin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_model_1 = __importDefault(require("../../models/client.model"));
const supplier_model_1 = __importDefault(require("../../models/supplier.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const materials_model_1 = __importDefault(require("../../models/materials.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
// login page get request..............
let transporter = nodemailer_1.default.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
});
const companylogin = (req, res) => {
    // const sgMail = require('@sendgrid/mail')
    //   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
    // const msg = {
    //   to: 'gokuldas439@gmail.com', // Change to your recipient
    //   from: 'nexuscompany439@gmail.com', // Change to your verified sender
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent')
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    transporter.sendMail({
        from: "nexuscompany439@gmail.com",
        to: "gokuldas439@gmail.com",
        subject: "Test message subject",
        text: "Hello world!",
        html: "<b>Hello world!</b>", // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({
        message: "hiiii"
    });
};
exports.companylogin = companylogin;
exports.getClients = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const clientData = await client_model_1.default.find({ companyId: _id });
    console.log(clientData);
    if (clientData) {
        res.status(200).json({
            data: clientData
        });
    }
    else {
        res.status(301);
        throw new Error('No Clients are Added');
    }
});
exports.getSuppliers = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const clientData = await supplier_model_1.default.find({ companyId: _id });
    console.log(clientData);
    if (clientData) {
        res.status(200).json({
            data: clientData
        });
    }
    else {
        res.status(301);
        throw new Error('No Clients are Added');
    }
});
// get the materials
exports.getMaterials = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const clientData = await materials_model_1.default.find({ companyId: _id });
    console.log(clientData);
    if (clientData) {
        res.status(200).json({
            data: clientData
        });
    }
    else {
        res.status(301);
        throw new Error('No Clients are Added');
    }
});
exports.getProducts = (0, express_async_handler_1.default)(async (req, res) => {
    const { _id } = req.user;
    const clientData = await products_model_1.default.find({ companyId: _id }).populate('materialId');
    console.log(clientData);
    if (clientData) {
        res.status(200).json({
            data: clientData
        });
    }
    else {
        res.status(301);
        throw new Error('No Clients are Added');
    }
});
