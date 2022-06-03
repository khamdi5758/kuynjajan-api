const db = require('../configs/database_config');
const crypto = require('randomstring');

module.exports ={
    // Ambil data semua user
    getdatauser(req,res){
            db.query(
                `
                SELECT * FROM tb_user;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    user: results 
                });
            });
        
    },
    // Ambil data user berdasarkan ID
    getdatauserbyid(req,res){
        let id = req.params.id;
                    db.query(
                `
                SELECT * FROM tb_user WHERE id_user = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    user: results,
                });
            });
    },

    getdatauserbyusername(req,res){
        let id = req.params.id;
        //let namfoto;
            db.query(
                `
                SELECT * FROM tb_user WHERE username = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    user: results,
                });

                // console.log(results);
                // console.log(`----------------------------------------------------------`);
                // results.forEach((data) => {
                //     namfoto = `${data.foto}`;
                // });
                // console.log(namfoto);
            });
        
    },
    // Simpan data user
    adddatauser(req,res){
        var uid = crypto.generate({length: 50}) + new Date().toISOString().replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/-/, '').replace(/:/, '').replace(/:/, '');
        

        let data = {
            id_user : uid,
            nama : req.body.nama,
            jen_kel : req.body.jenkel,
            no_telp : req.body.notelp,
            foto : req.file.filename,
            username : req.body.username,
            password : req.body.password
        }

            db.query(
                `
                INSERT INTO tb_user SET ?;
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

    // Update data user
    editdatauser(req,res){
        let id = req.params.id
        let namfoto

        if (!req.file) {
            db.query(
                `
                SELECT * FROM tb_user WHERE id_user = ?;
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
                        UPDATE tb_user SET ? WHERE id_user = ?;
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
                UPDATE tb_user SET ? WHERE id_user = ?;
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
    // Delete data user
    deletedatauser(req,res){
        let id = req.params.id;
            db.query(
                `
                DELETE FROM tb_user WHERE id_user = ?;
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