const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const crypto = require('randomstring');


pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua kurir
    getdatakurir(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    },
    // Ambil data kurir berdasarkan ID
    getdatakurirbyid(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
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
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
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
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    },
    // Delete data kurir
    deletedatakurir(req,res){
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    }
}