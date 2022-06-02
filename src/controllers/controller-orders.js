const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua orders
    getdataorders(req,res){
        db.query(
                `
                SELECT * FROM tb_orders;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
    },
    // Ambil data orders berdasarkan ID
    getdataordersbyid(req,res){
        let id = req.params.id;
        db.query(
                `
                SELECT * FROM tb_orders WHERE id_orders = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
    },
    // Simpan data orders
    adddataorders(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let data = {
            id_orders : req.body.uid,
            id_barang : req.body.idbarang,
            id_pembeli : req.body.idpembeli,
            jumlah : req.body.jumlah,
            total : req.body.total,
            alamat_kirim : req.body.alamatkirim,
            id_kurir : req.body.idkurir
        }
        db.query(
                `
                INSERT INTO tb_orders SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
    },
    // Update data orders
    editdataorders(req,res){
        let dataEdit = {
            id_barang : req.body.idbarang,
            id_pembeli : req.body.idpembeli,
            jumlah : req.body.jumlah,
            total : req.body.total,
            alamat_kirim : req.body.alamatkirim,
            id_kurir : req.body.idkurir
        }
        let id = req.params.id
            db.query(
                `
                UPDATE tb_orders SET ? WHERE id_orders = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
    },
    // Delete data orders
    deletedataorders(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM tb_orders WHERE id_orders = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
    }
}