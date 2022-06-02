const db = require('../configs/database_config');
const crypto = require('randomstring');
const { CLIENT_CONNECT_WITH_DB } = require('mysql/lib/protocol/constants/client');

module.exports ={
    // Ambil data semua pedagang
    getdatapedagang(req,res){
        
            db.query(
                `
                SELECT * FROM tb_pedagang;
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
    // Ambil data pedagang berdasarkan ID
    getdatapedagangbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM tb_pedagang WHERE id_pedagang = ?;
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
    // Simpan data pedagang
    adddatapedagang(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let data = {
            id_pedagang : uid,
            nama_pedagang : req.body.nama,
            alamat_usaha : req.body.alamat,
            foto_usaha : req.file.filename,
            no_telp : req.body.notelp,
            username : req.body.username,
            password : req.body.password
        }
        db.query(
                `
                INSERT INTO tb_pedagang SET ?;
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
    // Update data pedagang
    editdatapedagang(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {
            
            let dataEdit = {
                nama_pedagang : req.body.nama,
                alamat_usaha : req.body.alamat,
                foto_usaha : namfoto,
                no_telp : req.body.notelp,
                username : req.body.username,
                password : req.body.password
            }
        
            db.query(
                `
                UPDATE tb_pedagang SET ? WHERE id_pedagang = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });

        } else{

            let dataEdit = {
                nama_pedagang : req.body.nama,
                alamat_usaha : req.body.alamat,
                foto_usaha : req.file.filename,
                no_telp : req.body.notelp,
                username : req.body.username,
                password : req.body.password
            }
        
            db.query(
                `
                UPDATE tb_pedagang SET ? WHERE id_pedagang = ?;
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
    // Delete data pedagang
    deletedatapedagang(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM tb_pedagang WHERE id_pedagang = ?;
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