const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua kurir
    getdatakurir(req,res){
            db.query(
                `
                SELECT * FROM tb_kurir;
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
    // Ambil data kurir berdasarkan ID
    getdatakurirbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM tb_kurir WHERE id_kurir = ?;
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
    // Simpan data kurir
    adddatakurir(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let data = {
            id_kurir : uid,
            nama_kurir : req.body.nama,
            jen_kel : req.body.jenkel,
            foto_ktp : req.file.filename,
            foto_formal : req.file.filename,
            no_telp : req.body.notelp,
            username : req.body.username,
            password : req.body.password
        }
            db.query(
                `
                INSERT INTO tb_kurir SET ?;
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
    // Update data kurir
    editdatakurir(req,res){
        let dataEdit = {
            nama_kurir : req.body.nama,
            jen_kel : req.body.jenkel,
            // foto_ktp : req.file.filename,
            // foto_formal : req.file.filename,
            no_telp : req.body.notelp,
            username : req.body.username,
            password : req.body.password
        }
        let id = req.params.id
            db.query(
                `
                UPDATE tb_kurir SET ? WHERE id_kurir = ?;
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
    // Delete data kurir
    deletedatakurir(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM tb_kurir WHERE id_kurir = ?;
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