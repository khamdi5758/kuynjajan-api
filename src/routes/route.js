const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {pembeli,pedagang,kurir,dagangan,wishlist,orders } = require('../controllers');

const storage = multer.diskStorage({
    destination:'./src/images/',
    filename:(req,file,cb)=> {
        return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
    }
});

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "/uploads"));
//     },
//     // konfigurasi penamaan file yang unik
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
// });

const upload = multer({
    storage: storage
})
 

// GET localhost:8080/karyawan => Ambil data semua karyawan
// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
// PUT localhost:8080/karyawan/edit/2 => Edit data karyawan berdasarkan id = 2
// DELETE localhost:8080/karyawan/delete/2 => Delete data karyawan berdasarkan id = 2


router.get('/pembeli/get', pembeli.getdatapembeli);
router.get('/pembeli/get/:id', pembeli.getdatapembelibyid);
router.post('/pembeli/add',pembeli.adddatapembeli);
router.put('/pembeli/edit/:id', pembeli.editdatapembeli);
router.delete('/pembeli/delete/:id', pembeli.deletedatapembeli);


router.get('/pedagang', pedagang.getdatapedagang);
router.get('/pedagang/:id', pedagang.getdatapedagangbyid);
router.post('/pedagang/add', pedagang.adddatapedagang);
router.put('/pedagang/edit/:id', pedagang.editdatapedagang);
router.delete('/pedagang/delete/:id', pedagang.deletedatapedagang);


router.get('/kurir', kurir.getdatakurir);
router.get('/kurir/:id', kurir.getdatakurirbyid);
router.post('/kurir/add', kurir.adddatakurir);
router.put('/kurir/edit/:id', kurir.editdatakurir);
router.delete('/kurir/delete/:id', kurir.deletedatakurir);


router.get('/dagangan', dagangan.getdatadagangan);
router.get('/dagangan/:id', dagangan.getdatadaganganbyid);
router.post('/dagangan/add', dagangan.adddatadagangan);
router.put('/dagangan/edit/:id', dagangan.editdatadagangan);
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

module.exports = router;