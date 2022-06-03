const db = require('../configs/database_config');

module.exports ={
    // Ambil data semua wishlist
    getdatawishlist(req,res){
            db.query(
                `
                SELECT * FROM tb_wishlist;
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
    // Ambil data wishlist berdasarkan ID
    getdatawishlistbyid(req,res){
        let id = req.params.id;
            db.query(
                `
                SELECT * FROM tb_wishlist WHERE id_user = ?;
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
    // Simpan data wishlist
    adddatawishlist(req,res){
        let data = {
            id_user : req.body.iduser,
            id_barang : req.body.idbarang
        }
            db.query(
                `
                INSERT INTO tb_wishlist SET ?;
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
    // Delete data wishlist
    deletedatawishlist(req,res){
            let id_user = req.params.iduser;
            let id_barang = req.params.idbarang;
            db.query(
                `
                DELETE FROM tb_wishlist WHERE id_user =? and id_barang = ? ;
                `
            , [id_user,id_barang],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
    }
}