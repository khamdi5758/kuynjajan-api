-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Bulan Mei 2022 pada 16.38
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
-- Database: `db_kuynjajan`
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
  `id_pedagang` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_dagangan`
--

INSERT INTO `tb_dagangan` (`id_barang`, `nama`, `jenis`, `asal`, `harga`, `deskripsi`, `id_pedagang`) VALUES
('1324', 'wingko babat', 'makanan', 'lamongan', '10000', 'makanan wingko ini adalah makanan daerah khas babat', '101');

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
  `id_pembeli` varchar(11) NOT NULL,
  `jumlah` varchar(50) NOT NULL,
  `total` varchar(50) NOT NULL,
  `alamat_kirim` varchar(50) NOT NULL,
  `id_kurir` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_orders`
--

INSERT INTO `tb_orders` (`id_orders`, `id_barang`, `id_pembeli`, `jumlah`, `total`, `alamat_kirim`, `id_kurir`) VALUES
('785', '1324', '2', '3', '30000', 'surabaya', '31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_pedagang`
--

CREATE TABLE `tb_pedagang` (
  `id_pedagang` varchar(11) NOT NULL,
  `nama_pedagang` varchar(50) NOT NULL,
  `alamat_usaha` varchar(50) NOT NULL,
  `foto_usaha` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_pedagang`
--

INSERT INTO `tb_pedagang` (`id_pedagang`, `nama_pedagang`, `alamat_usaha`, `foto_usaha`, `no_telp`, `username`, `password`) VALUES
('101', 'tanti', 'lamongan', 'tanti.jpg', '085451423543', 'tanti', '********');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_pembeli`
--

CREATE TABLE `tb_pembeli` (
  `id_pembeli` varchar(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jen_kel` varchar(50) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_pembeli`
--

INSERT INTO `tb_pembeli` (`id_pembeli`, `nama`, `jen_kel`, `no_telp`, `foto`, `username`, `password`) VALUES
('1', 'khamdi', 'laki', '089501669689', 'khamdi.jpg', 'user1', '********'),
('2', 'alfa', 'perempuan', '085542134531', 'alfa.jpg', 'user2', '********');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_wishlist`
--

CREATE TABLE `tb_wishlist` (
  `id_pembeli` varchar(11) NOT NULL,
  `id_barang` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_wishlist`
--

INSERT INTO `tb_wishlist` (`id_pembeli`, `id_barang`) VALUES
('2', '1324');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_dagangan`
--
ALTER TABLE `tb_dagangan`
  ADD PRIMARY KEY (`id_barang`),
  ADD KEY `id_pedagang` (`id_pedagang`);

--
-- Indeks untuk tabel `tb_kurir`
--
ALTER TABLE `tb_kurir`
  ADD PRIMARY KEY (`id_kurir`);

--
-- Indeks untuk tabel `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD KEY `id_orders` (`id_orders`,`id_barang`,`id_pembeli`,`id_kurir`),
  ADD KEY `id_barang` (`id_barang`),
  ADD KEY `id_pembeli` (`id_pembeli`),
  ADD KEY `id_kurir` (`id_kurir`);

--
-- Indeks untuk tabel `tb_pedagang`
--
ALTER TABLE `tb_pedagang`
  ADD PRIMARY KEY (`id_pedagang`);

--
-- Indeks untuk tabel `tb_pembeli`
--
ALTER TABLE `tb_pembeli`
  ADD PRIMARY KEY (`id_pembeli`);

--
-- Indeks untuk tabel `tb_wishlist`
--
ALTER TABLE `tb_wishlist`
  ADD KEY `id_pembeli` (`id_pembeli`,`id_barang`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tb_dagangan`
--
ALTER TABLE `tb_dagangan`
  ADD CONSTRAINT `tb_dagangan_ibfk_1` FOREIGN KEY (`id_pedagang`) REFERENCES `tb_pedagang` (`id_pedagang`);

--
-- Ketidakleluasaan untuk tabel `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD CONSTRAINT `tb_orders_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `tb_pembeli` (`id_pembeli`),
  ADD CONSTRAINT `tb_orders_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `tb_dagangan` (`id_barang`),
  ADD CONSTRAINT `tb_orders_ibfk_3` FOREIGN KEY (`id_kurir`) REFERENCES `tb_kurir` (`id_kurir`);

--
-- Ketidakleluasaan untuk tabel `tb_wishlist`
--
ALTER TABLE `tb_wishlist`
  ADD CONSTRAINT `tb_wishlist_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `tb_pembeli` (`id_pembeli`),
  ADD CONSTRAINT `tb_wishlist_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `tb_dagangan` (`id_barang`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
