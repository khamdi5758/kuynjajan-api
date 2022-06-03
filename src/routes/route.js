const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {user,toko,kurir,dagangan,wishlist,orders } = require('../controllers');

// const storage = multer.diskStorage({
//     destination:'./src/images/',
//     filename:(req,file,cb)=> {
//         return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
//     }
// });

const diskStorage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'images');
    },
    // konfigurasi penamaan file yang unik
    filename: (req, file, cb) => {
      cb(null,new Date().getTime()+'-'+file.originalname);
    },
});

const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter
})
 

// GET localhost:8080/karyawan => Ambil data semua karyawan
// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
// PUT localhost:8080/karyawan/edit/2 => Edit data karyawan berdasarkan id = 2
// DELETE localhost:8080/karyawan/delete/2 => Delete data karyawan berdasarkan id = 2


router.get('/user/', user.getdatauser);
router.get('/user/:id', user.getdatauserbyid);
router.get('/user/:id', user.getdatauserbyusername);
router.post('/user/',upload.single('foto'), user.adddatauser);
router.put('/user/:id',upload.single('foto'), user.editdatauser);
router.delete('/user/:id', user.deletedatauser);


router.get('/toko/', toko.getdatatoko);
router.get('/toko/:id', toko.getdatatokobyid);
router.post('/toko/',upload.single('foto_toko'), toko.adddatatoko);
router.put('/toko/:id',upload.single('foto_toko'), toko.editdatatoko);
router.delete('/toko/:id', toko.deletedatatoko);


router.get('/dagangan/', dagangan.getdatadagangan);
router.get('/dagangan/:id', dagangan.getdatadaganganbyid);
router.post('/dagangan/',upload.single('foto_dagangan'), dagangan.adddatadagangan);
router.put('/dagangan/:id',upload.single('foto_dagangan'), dagangan.editdatadagangan);
router.delete('/dagangan/:id', dagangan.deletedatadagangan);


router.get('/wishlist', wishlist.getdatawishlist);
router.get('/wishlist/:id', wishlist.getdatawishlistbyid);
router.post('/wishlist/', wishlist.adddatawishlist);
router.delete('/wishlist/:iduser/:idbarang', wishlist.deletedatawishlist);


router.get('/orders', orders.getdataorders);
router.get('/orders/:id', orders.getdataordersbyid);
router.post('/orders/', orders.adddataorders);
router.put('/orders/:id', orders.editdataorders);
router.delete('/orders/:id', orders.deletedataorders);

// router.get('/kurir/get', kurir.getdatakurir);
// router.get('/kurir/get/:id', kurir.getdatakurirbyid);
// router.post('/kurir/add',upload.single('foto_ktp'), kurir.adddatakurir);
// router.put('/kurir/edit/:id',upload.single('foto_ktp'), kurir.editdatakurir);
// router.delete('/kurir/delete/:id', kurir.deletedatakurir);

module.exports = router;