const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua pembeli
    getdatapembeli(req,res){
            db.query(
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
        
    },
    // Ambil data pembeli berdasarkan ID
    getdatapembelibyid(req,res){
        let id = req.params.id;
                    db.query(
                `
                SELECT * FROM tb_pembeli WHERE id_pembeli = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    pembeli: results,
                });
            });
    },

    getdatapembelibyidduand(req,res){
        let id = req.params.id;
        let namfoto;
            db.query(
                `
                SELECT * FROM tb_pembeli WHERE id_pembeli = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    pembeli: results,
                });

                console.log(results);
                console.log(`----------------------------------------------------------`);
                results.forEach((data) => {
                    namfoto = `${data.foto}`;
                });
                console.log(namfoto);
            });
        
    },
    // Simpan data pembeli
    adddatapembeli(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        

        let data = {
            id_pembeli : uid,
            nama : req.body.nama,
            jen_kel : req.body.jenkel,
            no_telp : req.body.notelp,
            foto : req.file.filename,
            username : req.body.username,
            password : req.body.password
        }

            db.query(
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
    },

    // Update data pembeli
    editdatapembeli(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {
            db.query(
                `
                SELECT * FROM tb_pembeli WHERE id_pembeli = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                results.forEach((data) => {
                    namfoto = `${data.foto}`;
                });
                
                    let dataEdit = {
                        nama : req.body.nama,
                        jen_kel : req.body.jenkel,
                        no_telp : req.body.notelp,
                        foto : namfoto,
                    username : req.body.username,
                    password : req.body.password
                    }
                    db.query(
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
            });
            


        } else{
            
            let dataEdit = {
                nama : req.body.nama,
                jen_kel : req.body.jenkel,
                no_telp : req.body.notelp,
                foto : req.file.filename,
            username : req.body.username,
            password : req.body.password
            }
            db.query(
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
        }
    },
    // Delete data pembeli
    deletedatapembeli(req,res){
        let id = req.params.id;
            db.query(
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
    }
}