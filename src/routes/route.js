const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {pembeli,pedagang,kurir,dagangan,wishlist,orders } = require('../controllers');

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


router.get('/pembeli/get', pembeli.getdatapembeli);
router.get('/pembeli/get/:id', pembeli.getdatapembelibyid);
router.get('/pembeli/cari/:id', pembeli.getdatapembelibyidduand);
router.post('/pembeli/add',upload.single('foto'), pembeli.adddatapembeli);
router.put('/pembeli/edit/:id',upload.single('foto'), pembeli.editdatapembeli);
router.delete('/pembeli/delete/:id', pembeli.deletedatapembeli);


router.get('/pedagang/get', pedagang.getdatapedagang);
router.get('/pedagang/get/:id', pedagang.getdatapedagangbyid);
router.post('/pedagang/add',upload.single('foto_usaha'), pedagang.adddatapedagang);
router.put('/pedagang/edit/:id',upload.single('foto_usaha'), pedagang.editdatapedagang);
router.delete('/pedagang/delete/:id', pedagang.deletedatapedagang);


router.get('/dagangan/get', dagangan.getdatadagangan);
router.get('/dagangan/get/:id', dagangan.getdatadaganganbyid);
router.post('/dagangan/add',upload.single('foto_dagangan'), dagangan.adddatadagangan);
router.put('/dagangan/edit/:id',upload.single('foto_dagangan'), dagangan.editdatadagangan);
router.delete('/dagangan/delete/:id', dagangan.deletedatadagangan);


router.get('/wishlist', wishlist.getdatawishlist);
router.get('/wishlist/:id', wishlist.getdatawishlistbyid);
router.post('/wishlist/add', wishlist.adddatawishlist);
router.delete('/wishlist/delete/:idpembeli/:idbarang', wishlist.deletedatawishlist);


router.get('/orders', orders.getdataorders);
router.get('/orders/:id', orders.getdataordersbyid);
router.post('/orders/add', orders.adddataorders);
router.put('/orders/edit/:id', orders.editdataorders);
router.delete('/orders/delete/:id', orders.deletedataorders);

// router.get('/kurir/get', kurir.getdatakurir);
// router.get('/kurir/get/:id', kurir.getdatakurirbyid);
// router.post('/kurir/add',upload.single('foto_ktp'), kurir.adddatakurir);
// router.put('/kurir/edit/:id',upload.single('foto_ktp'), kurir.editdatakurir);
// router.delete('/kurir/delete/:id', kurir.deletedatakurir);

module.exports = router;