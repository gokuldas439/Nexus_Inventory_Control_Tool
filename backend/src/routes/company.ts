import { Router } from "express";
import * as viewControllers from '../controllers/company/viewContollers'
import * as authControllers from '../controllers/company/authControllers'
import * as crudControllers from "../controllers/company/crudControllers";
import * as authMiddlewares from "../middlewares/authMiddleware";
import multer from "multer";
import cloudinary from "cloudinary";
import path from 'path'


const router = Router();



const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(null, false);
        return;
      }
      cb(null, true);
    }
  })
  
  





// router for the login page view ..................................
router.put('/login',viewControllers.companylogin);


router.get('/getClients',authMiddlewares.protect('company'),viewControllers.getClients);


router.get('/getSuppliers',authMiddlewares.protect('company'),viewControllers.getSuppliers);

// get the materials data

router.get('/getMaterials',authMiddlewares.protect('company'),viewControllers.getMaterials);
// get the materials data

router.get('/getProducts',authMiddlewares.protect('company'),viewControllers.getProducts);

// router.post('/login')......................................

router.post('/login',authControllers.authCompanylogin);


// add client .........................................................

router.post('/addClient',authMiddlewares.protect('company'),crudControllers.addClient);

// edit client.................................................
router.put('/editClient',authMiddlewares.protect('company'),crudControllers.editClient);


// delete client...................................

router.delete('/deleteClient/:id',authMiddlewares.protect('company'),crudControllers.DeleteClient);


// add supplier by company........................
router.post('/addSupplier',authMiddlewares.protect('company'),crudControllers.addSupplier)


// edit supplier by company........................
router.patch('/editSupplier',authMiddlewares.protect('company'),crudControllers.editSupplier)


// delete supplier by company........................
router.delete('/deleteSupplier/:id',authMiddlewares.protect('company'),crudControllers.DeleteSupplier);


// add products.................................................

router.post('/addProduct',authMiddlewares.protect('company'),upload.array('images',4),crudControllers.addProduct);

// edit products................................................

router.patch('/editProduct',authMiddlewares.protect('company'),upload.array('images',4),crudControllers.editProduct);

// delete product................................................

router.delete('/deleteProduct',authMiddlewares.protect('company'),crudControllers.DeleteProduct)

// add material
router.post('/addMaterial',authMiddlewares.protect('company'),crudControllers.addMaterial);

// edit material
router.patch('/editMaterial',authMiddlewares.protect('company'),crudControllers.editMaterial);


export default router;