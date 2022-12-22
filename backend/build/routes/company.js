"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const viewControllers = __importStar(require("../controllers/company/viewContollers"));
const authControllers = __importStar(require("../controllers/company/authControllers"));
const crudControllers = __importStar(require("../controllers/company/crudControllers"));
const authMiddlewares = __importStar(require("../middlewares/authMiddleware"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path_1.default.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(null, false);
            return;
        }
        cb(null, true);
    }
});
// router for the login page view ..................................
router.put('/login', viewControllers.companylogin);
router.get('/getClients', authMiddlewares.protect('company'), viewControllers.getClients);
router.get('/getSuppliers', authMiddlewares.protect('company'), viewControllers.getSuppliers);
// get the materials data
router.get('/getMaterials', authMiddlewares.protect('company'), viewControllers.getMaterials);
// get the materials data
router.get('/getProducts', authMiddlewares.protect('company'), viewControllers.getProducts);
// router.post('/login')......................................
router.post('/login', authControllers.authCompanylogin);
// add client .........................................................
router.post('/addClient', authMiddlewares.protect('company'), crudControllers.addClient);
// edit client.................................................
router.put('/editClient', authMiddlewares.protect('company'), crudControllers.editClient);
// delete client...................................
router.delete('/deleteClient/:id', authMiddlewares.protect('company'), crudControllers.DeleteClient);
// add supplier by company........................
router.post('/addSupplier', authMiddlewares.protect('company'), crudControllers.addSupplier);
// edit supplier by company........................
router.patch('/editSupplier', authMiddlewares.protect('company'), crudControllers.editSupplier);
// delete supplier by company........................
router.delete('/deleteSupplier/:id', authMiddlewares.protect('company'), crudControllers.DeleteSupplier);
// add products.................................................
router.post('/addProduct', authMiddlewares.protect('company'), upload.array('images', 4), crudControllers.addProduct);
// edit products................................................
router.patch('/editProduct', authMiddlewares.protect('company'), upload.array('images', 4), crudControllers.editProduct);
// delete product................................................
router.delete('/deleteProduct', authMiddlewares.protect('company'), crudControllers.DeleteProduct);
// add material
router.post('/addMaterial', authMiddlewares.protect('company'), crudControllers.addMaterial);
// edit material
router.patch('/editMaterial', authMiddlewares.protect('company'), crudControllers.editMaterial);
exports.default = router;
