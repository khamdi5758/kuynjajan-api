const config = require('../configs/database');
const mysql = require('mysql');
const crypto = require('randomstring');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
}); 

module.exports ={
    // Ambil data semua pembeli
    getdatapembeli(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_pembeli;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    pembeli: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data pembeli berdasarkan ID
    getdatapembelibyid(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_pembeli WHERE id_pembeli = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    pembeli: results
                });
            });
            connection.release();
        })
    },
    // Simpan data pembeli
    adddatapembeli(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        

        let data = {
            id_pembeli : uid,
            nama : req.body.nama,
            jen_kel : req.body.jenkel,
            no_telp : req.body.notelp,
            foto : req.file.path,
            username : req.body.username,
            password : req.body.password
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO tb_pembeli SET ?;
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
    // Update data pembeli
    editdatapembeli(req,res){
        let dataEdit = {
            nama : req.body.nama,
            jen_kel : req.body.jenkel,
            no_telp : req.body.notelp,
            foto_prof : req.file.fotprof,
            username : req.body.username,
            password : req.body.password
        }
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE tb_pembeli SET ? WHERE id_pembeli = ?;
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
    // Delete data pembeli
    deletedatapembeli(req,res){
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM tb_pembeli WHERE id_pembeli = ?;
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