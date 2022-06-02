const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const crypto = require('randomstring');

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua dagangan
    getdatadagangan(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    },
    // Ambil data dagangan berdasarkan ID
    getdatadaganganbyid(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
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
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    },
    // Update data dagangan
    editdatadagangan(req,res){
        let dataEdit = {
            nama : req.body.nama,
            jenis : req.body.jenis,
            asal : req.body.asal,
            harga : req.body.harga,
            deskripsi : req.body.deskripsi,
            // foto_dagangan : req.file.filename,
            id_pedagang : req.body.idpedagang
        }
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    },
    // Delete data dagangan
    deletedatadagangan(req,res){
        let id = req.params.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
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
            connection.release();
        })
    }
}