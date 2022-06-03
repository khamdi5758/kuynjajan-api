-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jun 2022 pada 03.36
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kuynjajann`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_dagangan`
--

CREATE TABLE `tb_dagangan` (
  `id_barang` varchar(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `asal` varchar(50) NOT NULL,
  `harga` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL,
  `foto_dagangan` varchar(50) NOT NULL,
  `id_toko` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_dagangan`
--

INSERT INTO `tb_dagangan` (`id_barang`, `nama`, `jenis`, `asal`, `harga`, `deskripsi`, `foto_dagangan`, `id_toko`) VALUES
('1324', 'wingko babat', 'makanan', 'lamongan', '10000', 'makanan wingko ini adalah makanan daerah khas babat', 'wingko.jpg', '101'),
('PdXjgxBJAR3', 'tape', 'makanan', 'lamongan', '10000', 'tape semanis penjualnya', '1654219257369-Screenshot (3).png', '101'),
('z9BHD8jpILm', 'fita aspiranti', 'orang', 'bandung', 'minta dilamar', 'dah cantik. baik ,dan sholihah', '1654167975535-bg antariksa.jpg', '101');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_kurir`
--

CREATE TABLE `tb_kurir` (
  `id_kurir` varchar(11) NOT NULL,
  `nama_kurir` varchar(50) NOT NULL,
  `jen_kel` varchar(50) NOT NULL,
  `foto_ktp` varchar(50) NOT NULL,
  `foto_formal` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_kurir`
--

INSERT INTO `tb_kurir` (`id_kurir`, `nama_kurir`, `jen_kel`, `foto_ktp`, `foto_formal`, `no_telp`, `username`, `password`) VALUES
('31', 'subhan', 'laki-laki', 'ktpsub.jpg', 'fotofsub.jpg', '0895556665', 'subhan', '********');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_orders`
--

CREATE TABLE `tb_orders` (
  `id_orders` varchar(11) NOT NULL,
  `id_barang` varchar(11) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `jumlah` varchar(50) NOT NULL,
  `total` varchar(50) NOT NULL,
  `alamat_kirim` varchar(50) NOT NULL,
  `id_kurir` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_orders`
--

INSERT INTO `tb_orders` (`id_orders`, `id_barang`, `id_user`, `jumlah`, `total`, `alamat_kirim`, `id_kurir`) VALUES
('785', '1324', '2', '3', '30000', 'surabaya', '31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_toko`
--

CREATE TABLE `tb_toko` (
  `id_toko` varchar(11) NOT NULL,
  `nama_toko` varchar(50) NOT NULL,
  `alamat_toko` varchar(50) NOT NULL,
  `foto_toko` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `id_user` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_toko`
--

INSERT INTO `tb_toko` (`id_toko`, `nama_toko`, `alamat_toko`, `foto_toko`, `no_telp`, `id_user`) VALUES
('101', 'tanti', 'lamongan', 'tanti.jpg', '101', '1'),
('dJox4mrAoTZ', 'fita', 'bandung', '1654165115979-IMG_20210505_162744.jpg', '839408390583', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` varchar(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jen_kel` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `nama`, `jen_kel`, `no_telp`, `foto`, `username`, `password`) VALUES
('1', 'khamdi', 'laki', '089501669689', 'khamdi.jpg', 'user1', '********'),
('2', 'alfa nur', 'perempuan', '039284726893', '1654216814882-Screenshot (2).png', 'useralfa', '********');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_wishlist`
--

CREATE TABLE `tb_wishlist` (
  `id_user` varchar(11) NOT NULL,
  `id_barang` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_wishlist`
--

INSERT INTO `tb_wishlist` (`id_user`, `id_barang`) VALUES
('2', '1324');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_dagangan`
--
ALTER TABLE `tb_dagangan`
  ADD PRIMARY KEY (`id_barang`),
  ADD KEY `id_pedagang` (`id_toko`);

--
-- Indeks untuk tabel `tb_kurir`
--
ALTER TABLE `tb_kurir`
  ADD PRIMARY KEY (`id_kurir`);

--
-- Indeks untuk tabel `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD KEY `id_orders` (`id_orders`,`id_barang`,`id_user`,`id_kurir`),
  ADD KEY `id_barang` (`id_barang`),
  ADD KEY `id_pembeli` (`id_user`),
  ADD KEY `id_kurir` (`id_kurir`);

--
-- Indeks untuk tabel `tb_toko`
--
ALTER TABLE `tb_toko`
  ADD PRIMARY KEY (`id_toko`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `tb_wishlist`
--
ALTER TABLE `tb_wishlist`
  ADD KEY `id_pembeli` (`id_user`,`id_barang`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_dagangan`
--
ALTER TABLE `tb_dagangan`
  ADD CONSTRAINT `tb_dagangan_ibfk_1` FOREIGN KEY (`id_toko`) REFERENCES `tb_toko` (`id_toko`);

--
-- Ketidakleluasaan untuk tabel `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD CONSTRAINT `tb_orders_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `tb_dagangan` (`id_barang`),
  ADD CONSTRAINT `tb_orders_ibfk_3` FOREIGN KEY (`id_kurir`) REFERENCES `tb_kurir` (`id_kurir`);

--
-- Ketidakleluasaan untuk tabel `tb_toko`
--
ALTER TABLE `tb_toko`
  ADD CONSTRAINT `tb_toko_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `tb_wishlist`
--
ALTER TABLE `tb_wishlist`
  ADD CONSTRAINT `tb_wishlist_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `tb_dagangan` (`id_barang`),
  ADD CONSTRAINT `tb_wishlist_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
