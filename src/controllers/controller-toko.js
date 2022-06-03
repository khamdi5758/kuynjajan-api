const db = require('../configs/database_config');
const crypto = require('randomstring');
const { CLIENT_CONNECT_WITH_DB } = require('mysql/lib/protocol/constants/client');

module.exports ={
    // Ambil data semua toko
    getdatatoko(req,res){
        
            db.query(
                `
                SELECT * FROM tb_toko;
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
    // Ambil data toko berdasarkan ID
    getdatatokobyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM tb_toko WHERE id_toko = ?;
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
    // Simpan data toko
    adddatatoko(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        let data = {
            id_toko : uid,
            nama_toko : req.body.nama,
            alamat_toko : req.body.alamat,
            foto_toko : req.file.filename,
            no_telp : req.body.notelp,
            id_user : req.body.iduser
        }
        db.query(
                `
                INSERT INTO tb_toko SET ?;
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
    // Update data toko
    editdatatoko(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {
            db.query(
                `
                SELECT * FROM tb_toko WHERE id_toko = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                results.forEach((data) => {
                    namfoto = `${data.foto_toko}`;
                });
                let dataEdit = {
                    nama_toko : req.body.nama,
                    alamat_toko : req.body.alamat,
                    foto_toko : namfoto,
                    no_telp : req.body.notelp,
                    id_user : req.body.iduser
                }
        
                db.query(
                    `
                    UPDATE tb_toko SET ? WHERE id_toko = ?;
                    `
                , [dataEdit, id],
                function (error, results) {
                    if(error) throw error;  
                    res.send({ 
                        success: true, 
                        message: 'Berhasil edit data!',
                    });
                });
            });

        } else{

            let dataEdit = {
                nama_toko : req.body.nama,
                alamat_toko : req.body.alamat,
                foto_toko : req.file.filename,
                no_telp : req.body.notelp,
                id_user : req.body.iduser
            }
        
            db.query(
                `
                UPDATE tb_toko SET ? WHERE id_toko = ?;
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
    // Delete data toko
    deletedatatoko(req,res){
        let id = req.params.id
            db.query(
                `
                DELETE FROM tb_toko WHERE id_toko = ?;
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