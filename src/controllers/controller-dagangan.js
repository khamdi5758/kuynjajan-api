const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua dagangan
    getdatadagangan(req,res){
            db.query(
                `
                SELECT * FROM tb_dagangan;
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
    // Ambil data dagangan berdasarkan ID
    getdatadaganganbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM tb_dagangan WHERE id_barang = ?;
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
    // Simpan data dagangan
    adddatadagangan(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let data = {
            id_barang : uid,
            nama : req.body.nama,
            jenis : req.body.jenis,
            asal : req.body.asal,
            harga : req.body.harga,
            deskripsi : req.body.deskripsi,
            foto_dagangan : req.file.filename,
            id_pedagang : req.body.idpedagang
        }
            db.query(
                `
                INSERT INTO tb_dagangan SET ?;
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
    // Update data dagangan
    editdatadagangan(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {

            let dataEdit = {
                nama : req.body.nama,
                jenis : req.body.jenis,
                asal : req.body.asal,
                harga : req.body.harga,
                deskripsi : req.body.deskripsi,
                foto_dagangan : namfoto,
                id_pedagang : req.body.idpedagang
            }
            db.query(
                `
                UPDATE tb_dagangan SET ? WHERE id_barang = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });

        }else{

            let dataEdit = {
                nama : req.body.nama,
                jenis : req.body.jenis,
                asal : req.body.asal,
                harga : req.body.harga,
                deskripsi : req.body.deskripsi,
                foto_dagangan : req.file.filename,
                id_pedagang : req.body.idpedagang
            }
            db.query(
                `
                UPDATE tb_dagangan SET ? WHERE id_barang = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
        }
    },
    // Delete data dagangan
    deletedatadagangan(req,res){
        let id = req.params.id
        db.query(
                `
                DELETE FROM tb_dagangan WHERE id_barang = ?;
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