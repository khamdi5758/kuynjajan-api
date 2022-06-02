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
                SELECT * FROM tb_wishlist WHERE id_pembeli = ?;
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
            id_pembeli : req.body.idpembeli,
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
            let id_pembeli = req.params.idpembeli;
            let id_barang = req.params.idbarang;
            db.query(
                `
                DELETE FROM tb_wishlist WHERE id_pembeli =? and id_barang = ? ;
                `
            , [id_pembeli,id_barang],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
    }
}