-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-marinesrecipes.alwaysdata.net
-- Generation Time: Jan 24, 2022 at 09:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marinesrecipes_new_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Douceurs'),
(2, 'Petits déjeuners'),
(3, 'Repas healthy'),
(4, 'Boissons'),
(5, 'Amuses bouche'),
(6, 'Végétariennes');

-- --------------------------------------------------------

--
-- Table structure for table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `id_recipe` int(11) NOT NULL,
  `pseudo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `commentaires__images`
--

CREATE TABLE `commentaires__images` (
  `id_commentaire` int(11) NOT NULL,
  `id_image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id_recipe` int(11) NOT NULL,
  `pseudo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(90) NOT NULL,
  `image_link` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `image_link`) VALUES
(1, 'Flocons d\'avoine', 'https://i.pinimg.com/originals/2c/d0/49/2cd0495047669462e525c46de104b05a.png'),
(2, 'Oeuf(s)', 'https://i.pinimg.com/564x/99/7c/2a/997c2a770a24aa96554e74770fa66bc8.jpg'),
(3, 'Fleur de sel', 'https://i.pinimg.com/originals/c1/d6/2f/c1d62f1203ba2167599ed52d179524d4.png'),
(4, 'Farine', 'https://i.pinimg.com/originals/2e/53/5a/2e535ad98d095993cfd7e5534ab2b25e.png'),
(5, 'Sucre', 'https://i.pinimg.com/originals/a6/4a/3e/a64a3e7acb2ab01d18259aa92800ffb0.jpg'),
(6, 'Sucre vanillé', 'https://i.pinimg.com/originals/cc/e9/44/cce94431f896d05854cb713ab008fafb.jpg'),
(7, 'Noix', 'https://i.pinimg.com/originals/f2/d2/d1/f2d2d1846a3fea2c51c751de3fbcf9cf.webp'),
(8, 'Épinards frais', 'https://i.pinimg.com/originals/d2/74/4f/d2744fcfd5c234b41119182d4310af40.jpg'),
(9, 'Eau', 'https://i.pinimg.com/originals/05/ba/e4/05bae40c3c72c07b1940542d188d3b30.png'),
(10, 'Citron', 'https://i.pinimg.com/originals/26/29/bd/2629bd052de8c89d980c799f94df92eb.jpg'),
(11, 'Sucre de canne bio', 'https://i.pinimg.com/originals/8a/d6/d3/8ad6d330e2a0491a210f70e0e47cca0b.jpg'),
(12, 'Figue moelleuse bio', 'https://i.pinimg.com/originals/87/5b/d4/875bd4954bff77fefcf134d34fb12481.jpg'),
(13, 'Citron bio', 'https://i.pinimg.com/originals/26/29/bd/2629bd052de8c89d980c799f94df92eb.jpg'),
(14, 'Souches de kéfir', 'https://i.pinimg.com/originals/6f/33/33/6f3333736921705286af5d36c30bf344.jpg'),
(15, 'Banane(s)', 'https://i.pinimg.com/originals/77/7a/44/777a4497a3440a2326fe114a7d7ac87b.jpg'),
(16, 'Levure chimique', 'https://i.pinimg.com/originals/ee/71/86/ee71869d11a83c70ce103395e36da104.jpg'),
(17, 'Cacao amer', 'https://i.pinimg.com/originals/be/44/0f/be440f2b95c97165065012be89e70c52.jpg'),
(18, 'Lait', 'https://i.pinimg.com/originals/9a/5a/ea/9a5aeaa665927d5fa479dc4d3466b5ef.jpg'),
(19, 'Pépites de chocolat', 'https://i.pinimg.com/originals/3d/3e/e7/3d3ee7dd5ce4ce97ac6a58e1636af4dc.jpg'),
(20, 'Boulgour cru', 'https://i.pinimg.com/originals/2d/91/cc/2d91ccbf5eee72016ac9f6cc5a50973e.jpg'),
(21, 'Chèvre frais', 'https://i.pinimg.com/originals/b1/c0/39/b1c0399ea1b84251a7ac7fde2feb9e0c.png'),
(22, 'Miel', 'https://i.pinimg.com/originals/eb/39/6e/eb396eb61543b1edf60a8e56b3d8e415.png'),
(23, 'Vinaigre de riz', 'https://i.pinimg.com/originals/6f/4f/c9/6f4fc9014a456220609ffd7aa7d34618.jpg'),
(24, 'Ail en poudre', 'https://i.pinimg.com/originals/eb/0d/e9/eb0de9ef67aaf46730a268828926fb38.png'),
(25, 'Poivre', 'https://i.pinimg.com/originals/c0/fe/48/c0fe48b84482d768b2f46fc17d3ded65.png'),
(26, 'Nouilles de riz', 'https://i.pinimg.com/originals/e0/23/e9/e023e9695234cb085fc9c7fe513fa4b1.jpg'),
(27, 'boeuf', 'https://i.pinimg.com/originals/09/04/31/090431ca31a9f73036e71ad0971dd3dd.jpg'),
(28, 'Carotte(s)', 'https://i.pinimg.com/originals/dc/76/ee/dc76eed8a9346b8dd9539ea3dd70e5f3.png'),
(29, 'Haricots plats', 'https://i.pinimg.com/originals/ba/c0/be/bac0be1530d209da5f9c7ba46eec2600.jpg'),
(30, 'Pousses de haricots', 'https://i.pinimg.com/originals/6b/43/88/6b43885620c2d4ebaf8ab17c2fd0502c.jpg'),
(31, 'Huile de coco', 'https://i.pinimg.com/originals/ef/a4/09/efa409b37ad62936c216b81b9314ead5.jpg'),
(32, 'Mélanges de fruits secs (amandes, noix, noisettes, noix de cajou, noix de pécan..)', 'https://i.pinimg.com/originals/08/ce/b4/08ceb44fc5e644e52a6050f30161b659.jpg'),
(33, 'Extrait de vanille', 'https://i.pinimg.com/originals/f2/0a/31/f20a314cc445fad6a67bab5defb5f90b.png'),
(34, 'Levure boulangère sèche', 'https://i.pinimg.com/originals/bf/77/46/bf7746f483be05160b0fce82cd5d5e40.png'),
(35, 'Sel', 'https://i.pinimg.com/originals/f8/f8/6d/f8f86de127fbae75c4d1b90088908f05.jpg'),
(36, 'Gingembre', 'https://i.pinimg.com/originals/91/18/30/911830dc8f7502b8bfa06e7600b35eed.jpg'),
(37, 'Coriandre', 'blob:https://www.pinterest.fr/ec046218-9071-4d70-ba42-ee0a6f4bf490'),
(38, 'Jus de pomme', 'https://i.pinimg.com/originals/84/2e/f7/842ef7f1ed0b366a81f9e93a16b9a063.jpg'),
(39, 'Banane(s) bien mûre(s)', 'https://i.pinimg.com/originals/82/51/3a/82513a4e2f394993410625f81c3fd5c4.png'),
(40, 'Huile', 'https://i.pinimg.com/originals/f4/6a/85/f46a85aae32246cfd870f5162873448a.jpg'),
(41, 'Bicarbonate de soude', 'https://i.pinimg.com/originals/7a/79/a3/7a79a32d1a5acf466d4bbab1f96a709b.png'),
(42, 'Steack hachés 5% de matière grasse', 'https://i.pinimg.com/originals/fd/22/05/fd220582832744454a782c9f67a9a683.jpg'),
(43, 'Sauce soja', 'https://i.pinimg.com/originals/00/68/28/0068286dd26ebf1cc6afc748f1160b28.jpg'),
(44, 'Oignon(s)', 'https://i.pinimg.com/originals/c7/64/49/c76449aa8fbbb147bf508d87efbf3d57.jpg'),
(45, 'Chocolat noir', 'https://i.pinimg.com/originals/c9/ea/45/c9ea45c3d513d6c43a9845cd7013029d.jpg'),
(46, 'Beurre', 'https://i.pinimg.com/originals/9f/2c/cd/9f2ccd5d6670b569219861c3845600d0.png'),
(47, 'Blanc(s) de poulet(s)', 'https://i.pinimg.com/originals/43/a1/50/43a150f8f3c31c75fce671b72e42a061.jpg'),
(48, 'Huile de sésame', 'https://i.pinimg.com/originals/15/bf/56/15bf561c09ff2cb530faf4d6fcd61e8a.png'),
(49, 'Pois chiches', 'https://i.pinimg.com/originals/61/d1/b8/61d1b8df8ef43fca8f1f9d8df97d367a.png'),
(50, 'Paprika', 'https://i.pinimg.com/originals/9e/58/d2/9e58d2e383b20e6f26680cb6b07644f8.jpg'),
(51, 'Huile d\'olive', 'https://i.pinimg.com/originals/27/33/7c/27337c232bf65c9c6898feddd7838a54.jpg'),
(52, 'Sirop d\'agave', 'https://i.pinimg.com/originals/ff/52/e0/ff52e00982cb64c2b5aca1bc53c2b7ef.jpg'),
(53, 'Pâte feuilletée', 'https://i.pinimg.com/originals/27/d2/01/27d2016e36a2ed236537fa52ccd9ec31.jpg'),
(54, 'Moutarde', 'https://i.pinimg.com/originals/40/41/d8/4041d8b0c0fc1c1e97da66f870fdc0df.jpg'),
(55, 'Tomates cerises', 'https://i.pinimg.com/originals/d0/d2/cb/d0d2cbaba0b633a8eca6a100d40f2988.jpg'),
(56, 'Origan', 'https://i.pinimg.com/originals/dc/14/ea/dc14eae9ff2da22917e3914672a75297.png'),
(57, 'Mozzarella', 'https://i.pinimg.com/originals/b0/27/b1/b027b1825b731806654193c20e60e4ee.jpg'),
(58, 'Courgette', 'https://i.pinimg.com/originals/a6/50/41/a650413b5f40e69a95d6dd57bf3d4ced.jpg'),
(59, 'Gnocchi à poêler', 'https://i.pinimg.com/originals/8c/65/15/8c6515b9b1b83ece3f2b84b69aa9db67.jpg'),
(60, 'Jambon blanc', 'https://i.pinimg.com/originals/ed/a7/ea/eda7ea0ba929f63f35b3e28a2bb3befd.png'),
(61, 'Maïzena', 'https://i.pinimg.com/originals/d0/fc/18/d0fc186272354c815f2a3f92284663df.jpg'),
(62, 'Noix de muscade', 'https://i.pinimg.com/originals/87/8a/07/878a07b18ccdfc100286214fa3f6afe0.jpg'),
(63, 'Parmesan', 'https://i.pinimg.com/originals/a5/c4/2d/a5c42d7a2ef753b90d1f2eb92e1c6788.jpg'),
(64, 'Pommes de terre', 'https://i.pinimg.com/originals/03/ff/7b/03ff7b68a3510599c7eedf211abee0dd.jpg'),
(65, 'Échalote(s)', 'https://i.pinimg.com/originals/c4/f0/14/c4f01499150772ddc72aac22aad1ffe8.jpg'),
(66, 'Gousse(s) d\'ail', 'https://i.pinimg.com/originals/f4/83/bb/f483bbdf4dac21743fbd610283c0cbe4.jpg'),
(67, 'Cumin', 'https://i.pinimg.com/originals/19/eb/b4/19ebb47a58d101cf054d3a06fbe482cb.png'),
(68, 'Tomates pelées', 'https://i.pinimg.com/originals/b2/28/6e/b2286e045e3304201c70e86ccc9b0298.jpg'),
(69, 'Citron vert', 'https://i.pinimg.com/originals/d6/b4/19/d6b419847fc9db9240db777bdb10e2a7.jpg'),
(70, 'Persil', 'https://i.pinimg.com/originals/78/50/3e/78503e070a980437abc42fb863533e41.jpg'),
(71, 'Yaourt nature', 'https://i.pinimg.com/originals/19/91/23/199123113edf2da22a427ed135af7332.png'),
(72, 'Farine semi-complète', 'https://i.pinimg.com/originals/e5/58/d5/e558d5648a0ab4bd44aa0ee09153f402.png'),
(73, 'Fromage blanc 0%', 'https://i.pinimg.com/originals/4d/ca/4d/4dca4dff22cc5761d212b58ed28dfa12.webp'),
(74, 'Bûche de chèvre', 'https://i.pinimg.com/originals/2e/ba/91/2eba91aeb5fb8b5936d9f6a37fc86cc9.png'),
(75, 'Allumettes de bacon', 'https://www.pinterest.fr/pin/714524297135354002/'),
(76, 'Bière', 'https://i.pinimg.com/originals/06/39/fe/0639fe71403c56be899b8424ae9a2306.jpg'),
(77, 'Thon égoutté', 'https://i.pinimg.com/originals/56/e3/c0/56e3c06b159b5a6f7cddd2a403aec06a.jpg'),
(78, 'Curry', 'https://i.pinimg.com/originals/30/1f/36/301f367ab4e4a10c6e0c7e1b895b1bcb.png'),
(79, 'Curcuma', 'https://i.pinimg.com/originals/96/3e/11/963e1160e2f44e1c825755c777d5f76c.jpg'),
(80, 'Haricots verts', 'https://i.pinimg.com/originals/1f/b3/1d/1fb31d4f647a152a103fe9a6f7830290.webp'),
(81, 'Vinaigre de cidre', 'https://i.pinimg.com/originals/30/7b/30/307b30ec1fd94fa177f97b95096baad3.jpg'),
(82, 'Fruits rouges', 'https://i.pinimg.com/originals/36/82/3a/36823a71f3f9f2a10cded26fc78faf3e.jpg'),
(83, 'Concentré de tomates', 'https://i.pinimg.com/originals/88/e9/c9/88e9c9984fafea6f268961dd2e23890b.jpg'),
(84, 'Gruyère râpé', 'https://i.pinimg.com/originals/da/a0/a7/daa0a7c717f641a9faa459d478b69ce6.jpg'),
(85, 'Basilic frais', 'https://i.pinimg.com/originals/36/5e/45/365e458521f05a1404933b85e6d3ebcd.jpg'),
(86, 'Blanc d\'oeuf', 'https://i.pinimg.com/originals/32/8a/3a/328a3ac63aae22a4295b72c35529c7f5.jpg'),
(87, 'Purée de noisette', 'https://i.pinimg.com/originals/40/3d/4a/403d4a38fe718efaf743d21b3b457d3f.jpg'),
(88, 'Noisettes', 'https://i.pinimg.com/originals/76/50/cc/7650cccf57dbc699dcb1498593d9041b.png'),
(89, 'Salade', 'https://i.pinimg.com/originals/be/79/c6/be79c6074e1c31020806121c0eece2d5.png'),
(90, 'Lentilles', 'https://i.pinimg.com/originals/35/04/ee/3504ee175cc8ccbbec58667e3ffb7a33.png'),
(91, 'Radis', 'https://i.pinimg.com/originals/38/7c/6a/387c6a9a977ab79dbe9433ad6f3e968a.jpg'),
(92, 'Boursin', 'https://i.pinimg.com/originals/99/ed/15/99ed15e6a729fd7055c401aa04a9c1cb.jpg'),
(93, 'Graines de pavot', 'https://i.pinimg.com/originals/7f/bb/6d/7fbb6def52d21d96382d09f82617f9ab.png'),
(94, 'Vinaigre balsamique', 'https://i.pinimg.com/originals/53/48/d9/5348d94cd0a4f25187f20c8add7b8931.jpg'),
(95, 'Noix de coco râpée', 'https://i.pinimg.com/originals/63/d7/b8/63d7b8912f1c7c306bf6dc021b7affba.jpg'),
(96, 'Quinoa cru', 'https://i.pinimg.com/originals/8a/fe/29/8afe2946548558f358d8c7f024ebf577.jpg'),
(97, 'Viande hachée 5% de matière grasse', 'https://i.pinimg.com/originals/55/a0/69/55a0690788d597c1277c7baef976c3a3.jpg'),
(98, 'Chocolat 70%', 'https://i.pinimg.com/originals/33/1e/32/331e323beffd585a242895593b231b3a.webp'),
(99, 'Beurre de cacahuète', 'https://i.pinimg.com/originals/d3/6a/57/d36a57a88dd3a0fe1700ae52e2e1b137.png'),
(100, 'Amandes', 'https://i.pinimg.com/originals/49/40/43/49404329b85b38fe8f58be0c66ed0ceb.png'),
(101, 'Haricots rouges', 'https://i.pinimg.com/originals/45/9b/d8/459bd897adaea8b24e71ebb93ea34f74.jpg'),
(102, 'Maïs', 'https://i.pinimg.com/originals/24/8a/2b/248a2bb79675bb1067a6313a88cd31f0.webp'),
(103, 'Purée de tomates', 'https://i.pinimg.com/originals/51/0c/06/510c06d5cd1722f6153bc3127002dc04.png'),
(104, 'Piment d\'espelette', 'https://i.pinimg.com/originals/2a/cd/77/2acd777e2b3eb59890b0f03a019d4bb3.png'),
(105, 'Poudre d\'amandes', 'https://i.pinimg.com/originals/72/93/e2/7293e2a0a78ded8f3b397cf49edeb053.jpg'),
(106, 'Semoule', 'https://i.pinimg.com/originals/0d/67/47/0d6747ebbbfed63481c8acb2cf5c15a8.jpg'),
(107, 'Tomate(s)', 'https://i.pinimg.com/originals/22/c9/c4/22c9c4b54d174e90215c958e8e65c5fe.jpg'),
(108, 'Poivron(s)', 'https://i.pinimg.com/originals/ae/40/ec/ae40ec62473924e0dfb7b9ef08f88766.png'),
(109, 'Menthe', 'https://i.pinimg.com/originals/98/29/20/98292036cad951c1fac36381de938d53.png'),
(110, 'Sucre de coco', 'https://i.pinimg.com/originals/48/b7/cf/48b7cfaf31c507b0d9ce4453525a1889.jpg'),
(111, 'Jaune d\'oeuf', 'https://i.pinimg.com/originals/96/ff/81/96ff81ed4cc715b982564c204c446565.jpg'),
(112, 'Nutella', 'https://i.pinimg.com/originals/c8/5c/f4/c85cf4c8838139debefd36f640592287.jpg'),
(113, 'Wraps complets', 'https://i.pinimg.com/originals/f1/dc/a5/f1dca502cab18534be13221b8d7ccfb8.jpg'),
(114, 'Riz basmati', 'https://i.pinimg.com/originals/5b/c5/72/5bc57277a328993cbfd26b73d8d7f630.png'),
(115, 'Protéines de soja', 'https://i.pinimg.com/originals/76/8f/ea/768fea644af23cb432f5b0de2a6ba08d.jpg'),
(116, 'Poireau(x)', 'https://i.pinimg.com/originals/3e/7a/33/3e7a33ad930128d630b7ad8f8d343928.png'),
(117, 'Oignon(s) rouge(s)', 'https://i.pinimg.com/originals/96/5e/c8/965ec8359045cbc80205ec2d18efaf68.jpg'),
(118, 'Eau en bouteille', 'https://i.pinimg.com/originals/11/ed/c3/11edc32f7f5f8a880601b0f1e35bf8b6.jpg'),
(119, 'Tagliatelles fraiches', 'https://i.pinimg.com/originals/b3/6d/fb/b36dfbd5c32ba597c7766abc2cdf4e69.jpg'),
(120, 'Fromage frais', 'https://i.pinimg.com/originals/a4/f4/ee/a4f4eeac93f499043846a7174be3fbbe.jpg'),
(121, 'Feuilles de brick', 'https://i.pinimg.com/originals/03/2a/1b/032a1bb45274cab9b140495ffac4450b.jpg'),
(122, 'Thym', 'https://i.pinimg.com/originals/1a/c5/e9/1ac5e98d22eb7c6c82b9f61d5837488f.jpg'),
(123, 'Lait de coco', 'https://i.pinimg.com/originals/a3/8a/52/a38a529470953731abaa6017085194cb.png'),
(124, 'Riz', 'https://i.pinimg.com/originals/1a/c4/a6/1ac4a60746f55cbaac6aeb8e36a85145.jpg'),
(125, 'Framboises', 'https://i.pinimg.com/originals/a6/37/3a/a6373a09148a9dbdf4d42e517cc84c90.webp'),
(126, 'Levure boulangère fraîche', 'https://i.pinimg.com/originals/0b/bd/8d/0bbd8d054f8c5a2d2b85f51a6e0ed33f.png'),
(127, 'Canelle', 'https://i.pinimg.com/originals/a1/1c/75/a11c75d609224a9c84e6a2b208925b36.png'),
(128, 'Sucre perlée', 'https://i.pinimg.com/originals/18/e6/4a/18e64ae81e3d4a535945c76a53284cdc.jpg'),
(129, 'Cranberry', 'https://i.pinimg.com/originals/b0/d4/98/b0d49862fe6d268bd817ecd7d23537a0.jpg'),
(130, 'Baies de goji', 'https://i.pinimg.com/originals/67/7e/ad/677ead2838898d4b9eb945dae12a5e49.jpg'),
(131, 'Graines de chia', 'https://i.pinimg.com/originals/60/49/e8/6049e892fcca95c61b10e936eda926fe.jpg'),
(132, 'Anis vert', 'https://i.pinimg.com/originals/57/4f/09/574f09ccf2ef942917ef4423bf5d8410.png'),
(133, 'Mélange 4 épices', 'https://i.pinimg.com/originals/e0/89/4c/e0894c6cd345691abfb35254c6a89e0e.jpg'),
(134, 'Son d\'avoine', 'https://i.pinimg.com/originals/bb/51/b8/bb51b8a3babcf247994d99a69222b8db.jpg'),
(135, 'Pomme', 'https://i.pinimg.com/originals/cd/95/f3/cd95f39b2d8f06b70b3c622147d12226.jpg'),
(136, 'Amandes effilées', 'https://i.pinimg.com/originals/51/7b/47/517b47da6ce821ee51071737e538063d.jpg'),
(137, 'Noix concassées', 'https://i.pinimg.com/originals/f2/d2/d1/f2d2d1846a3fea2c51c751de3fbcf9cf.webp'),
(138, 'Cacahuète(s) non salée(s)', 'https://i.pinimg.com/originals/b7/85/62/b78562453ad4c37e09edaef0452de03e.jpg'),
(139, 'Huile de tournesol', 'https://i.pinimg.com/originals/f4/6a/85/f46a85aae32246cfd870f5162873448a.jpg'),
(140, 'Filet(s) de poulet', 'https://i.pinimg.com/originals/43/a1/50/43a150f8f3c31c75fce671b72e42a061.jpg'),
(141, 'Tige d\'oignon frais', 'https://i.pinimg.com/originals/51/4a/9c/514a9c58dee18e64f525e6a7d4da0d21.jpg'),
(142, 'Sel rose', 'https://i.pinimg.com/originals/cb/01/54/cb01548f18c668929826bd627f9bd687.png'),
(143, 'Tabasco', 'https://i.pinimg.com/originals/6f/8d/58/6f8d5867ee1498d4f806433070a0ce39.jpg'),
(144, 'Tomates concassées', 'https://i.pinimg.com/originals/f5/0d/84/f50d84b56d150ad0e744e8291334fd69.jpg'),
(145, 'Sucre de canne', 'https://i.pinimg.com/originals/0c/8c/27/0c8c2730d2f8eabf8c57dfda84f91008.png'),
(146, 'Tartare', 'https://i.pinimg.com/originals/a6/68/91/a668912872b2b7c3ef85545d83a6f211.png'),
(147, 'Vache qui rit', 'https://i.pinimg.com/originals/39/15/4e/39154e508bc48ca6adc6cf2340719bcd.jpg'),
(148, 'Noix de pécan', 'https://i.pinimg.com/originals/a0/61/25/a061250bcb2051aede4851a8cb1970b3.jpg'),
(149, 'Spéculoos', 'https://i.pinimg.com/originals/b6/01/3d/b6013df5a85745f0559dbd30b0fe859e.png'),
(150, 'Knacki ball', 'https://i.pinimg.com/originals/13/59/db/1359dbdd2fc60a4ddbdf6c3c6b53bb2d.png'),
(151, 'Lait en poudre', 'https://i.pinimg.com/originals/23/bd/3b/23bd3b212cf0916b717f95b35af26cd4.png'),
(152, 'Lentilles corail', 'https://i.pinimg.com/originals/83/69/4e/83694ed2bf0beaa67c1e2fd130108b1d.jpg'),
(153, 'Concombre', 'https://i.pinimg.com/originals/bb/66/04/bb6604ca0d8324b102b45e70b5f809f0.jpg'),
(154, 'Graines (sésame, courge, tournesol, baie de gojie..)', 'https://i.pinimg.com/originals/69/93/5d/69935d72c05cc7b3ad772ccf3d3d13c8.jpg'),
(155, 'Tofu fumé', 'https://i.pinimg.com/originals/39/26/7a/39267a4a6658381edc01c7900d23656a.png'),
(156, 'Lait végétal', 'https://i.pinimg.com/originals/bf/8c/ab/bf8cabdd4a6d6f827fcce273e4fcb7d3.jpg'),
(157, 'Aneth', 'https://i.pinimg.com/originals/a0/44/21/a044215182f0a8bacefbe1f5536f25fa.jpg'),
(158, 'Saumon fumé', 'https://i.pinimg.com/originals/cb/b4/63/cbb4632d6eac9bfd1f2ba996f852a1bc.png'),
(159, 'Myrtilles', 'https://i.pinimg.com/originals/38/71/65/38716566a65be992f8388ccfc8fe66da.png'),
(160, 'Bouillon cube', 'https://i.pinimg.com/originals/0e/c0/b9/0ec0b9ae639803c38c116d0dbef3d751.png'),
(161, 'Riz thaï complet', 'https://i.pinimg.com/originals/eb/b2/9c/ebb29cc578cb8d88205887358956d66b.jpg'),
(162, 'Purée de chocolat noisette', 'https://i.pinimg.com/originals/86/fa/52/86fa528da40bb01d14d2ffcba9a7f022.jpg'),
(163, 'Mangue', 'https://i.pinimg.com/originals/14/72/93/14729335ed95b2ecb247ff4fd6d5edd4.jpg'),
(164, 'Haricots blancs', 'https://i.pinimg.com/originals/dd/19/18/dd19186118327ab3bee9fa6212a54b46.png'),
(165, 'Petits pois', 'https://i.pinimg.com/originals/03/11/e1/0311e1f55f266a722439033a7a40d8e2.jpg'),
(166, 'Oignon nouveau', 'https://i.pinimg.com/originals/51/4a/9c/514a9c58dee18e64f525e6a7d4da0d21.jpg'),
(167, 'Pain aux céréales', 'https://i.pinimg.com/originals/33/52/f9/3352f970e1a16d491788f5bb73bc150d.png'),
(168, 'Jambon sec', 'https://i.pinimg.com/originals/7e/64/4d/7e644db5c7b21d8e2459c0228b88cbc5.png'),
(169, 'Graines de sésame', 'https://i.pinimg.com/originals/62/19/d9/6219d91deff4bb8cadb441c850e55272.webp'),
(170, 'Dattes', 'https://i.pinimg.com/originals/92/2c/38/922c389655871638bb87b59d5909bd4d.jpg'),
(171, 'Fraises', 'https://i.pinimg.com/originals/dc/cd/36/dccd36ef6e67985d2f94acfadbefe66d.png'),
(172, 'Abricots', 'https://i.pinimg.com/originals/08/ae/ee/08aeee823d77060c5d2b4b077d477b8a.jpg'),
(173, 'Ciboulette', 'https://i.pinimg.com/originals/93/b5/6a/93b56a6c352cb04fe455e814ab93862a.jpg'),
(174, 'Graines de sarrasin', 'https://i.pinimg.com/originals/83/1d/da/831dda29149f90f31bc71505d5840ce1.jpg'),
(175, 'Graines de tournesol', 'https://i.pinimg.com/originals/32/86/57/3286574b85e7f1e62ff4c707d4f3f022.png'),
(176, 'Noix de cajou', 'https://i.pinimg.com/originals/9a/b3/b0/9ab3b0fe7ff23717518a59a0f7b1c1a5.jpg'),
(177, 'Pomme granny', 'https://i.pinimg.com/originals/28/95/20/289520ec936e9c38c83eb75bb545bc37.jpg'),
(178, 'Pommes grenailles', 'https://i.pinimg.com/originals/b6/a3/f6/b6a3f69ecaf0544f2b7230b778897780.png'),
(179, 'Melon', 'https://i.pinimg.com/originals/7d/b7/af/7db7af724f28ed079b0f29265f342beb.jpg'),
(180, 'Lait d\'amandes', 'https://i.pinimg.com/originals/7a/f9/b0/7af9b0017be520f3730621051890fd22.jpg'),
(181, 'Nectarines', 'https://i.pinimg.com/originals/23/15/a5/2315a55c9fd8ad59c569c3d89802e7db.jpg'),
(182, 'Cheddar rapé', 'https://i.pinimg.com/originals/74/00/3e/74003ecc727d8cbbe4bc4a85774ec66c.jpg'),
(183, 'Chapelure', 'https://i.pinimg.com/originals/7f/2c/65/7f2c65ef5f9f8bb809ee88c7337662f2.png'),
(184, 'Levure de bière', 'https://i.pinimg.com/originals/ea/c1/26/eac1267593c86f7f70585e818f43e392.jpg'),
(185, 'Graines de courge', 'https://i.pinimg.com/originals/f9/16/9c/f9169c3a4ac0626f8677b7c9d59cd9e5.png'),
(186, 'Pain dure', 'https://i.pinimg.com/originals/8a/ec/e3/8aece3cc11c84097186e3b1ac37b86ad.jpg'),
(187, 'Granola', 'https://i.pinimg.com/originals/96/a4/94/96a4943fc1add7d68f7bceae7abee9f4.jpg'),
(188, 'Vermicelles d\'haricots mungo', 'https://i.pinimg.com/originals/ad/17/7c/ad177cdd6e9eed14e76506eb4b39e19c.jpg'),
(189, 'Feuilles de riz', 'https://i.pinimg.com/originals/bf/a3/6c/bfa36c2c9ff1040407554c7434906418.jpg'),
(190, 'Chou rouge', 'https://i.pinimg.com/originals/79/99/e8/7999e8e333d7d61c556970b6ee904443.jpg'),
(191, 'Purée de sésame (Tahin)', 'https://i.pinimg.com/originals/de/26/40/de2640e1b9f1ba0ec3876ba04f2fb194.jpg'),
(192, 'Avocat', 'https://i.pinimg.com/originals/52/3c/d6/523cd618e37c57dd2063a5e9a1c403b3.jpg'),
(193, 'Haché végétal', 'https://i.pinimg.com/originals/31/06/2e/31062eb7ccb85fd7e66425a1ff37c06b.png'),
(194, 'Pulpe de tomates', 'https://i.pinimg.com/originals/14/9e/61/149e61d0a90dbbbc4473aa7f3d9ff957.jpg'),
(195, 'Vinaigre de vin rouge', 'https://i.pinimg.com/originals/46/ab/fb/46abfbf18d352ec4282f658f203f39bd.jpg'),
(196, 'Feuille de laurier', 'https://i.pinimg.com/originals/2e/80/7b/2e807bbc99776ca51c6a6c2157df763e.jpg'),
(197, 'Feuilles de gélatine', 'https://i.pinimg.com/originals/c5/46/42/c54642e929ee66293fc70404d1e4aff9.jpg'),
(198, 'Framboises lyophilisées', 'https://i.pinimg.com/originals/d7/6b/3b/d76b3b1a93b6db09a424bb9aa4619f83.jpg'),
(199, 'Crispy soja', 'https://i.pinimg.com/originals/d9/bf/43/d9bf43b9dc296f1713ae709fa94e8e5d.jpg'),
(200, 'Courge spaghetti', 'https://i.pinimg.com/originals/ab/39/59/ab39590676a9b1cb2057c2860925967a.jpg'),
(201, 'Vin blanc', 'https://i.pinimg.com/originals/ed/10/7b/ed107b6d2f7f0debd9432d739dc80cb7.png'),
(202, 'Plaques de ravioles', 'https://i.pinimg.com/originals/b9/d9/87/b9d98773df1a8c6939dc4cee16173b16.jpg'),
(203, 'Mimolette', 'https://i.pinimg.com/originals/55/d5/dc/55d5dc496c841060c7e4a122098dc625.png'),
(204, 'Sucre complet', 'https://i.pinimg.com/originals/b3/6b/c5/b36bc5e2524c52c9565eb0f0760da185.jpg'),
(205, 'Compote sans sucres ajoutés', 'https://i.pinimg.com/originals/f8/c8/16/f8c8167d63e492b2f092b0afaa77136c.jpg'),
(206, 'Ananas', 'https://i.pinimg.com/originals/3c/3a/02/3c3a02f32f327fa11634548432ce334e.webp'),
(207, 'Épinards à la crème', 'https://i.pinimg.com/originals/3b/a0/e8/3ba0e834fe2f0f5d406f28a7ae4a13e6.jpg'),
(208, 'Eau filtrée', 'https://i.pinimg.com/originals/05/ba/e4/05bae40c3c72c07b1940542d188d3b30.png'),
(209, 'Whey chocolat caramel', 'https://i.pinimg.com/originals/41/6c/8e/416c8ee18ee361fb84785f068761cca4.jpg'),
(210, 'Dos de cabillaud', 'https://i.pinimg.com/originals/4f/d3/e5/4fd3e581b1bc51f752d33bc0280f6b5a.jpg'),
(211, 'Blanc(s) de poireau(x)', 'https://i.pinimg.com/originals/9a/a4/20/9aa42056e09b0049bd551a84b71577d9.png'),
(212, 'Crème de coco', 'https://i.pinimg.com/originals/c1/d5/d3/c1d5d3113367e60d30742df3b71a7871.jpg'),
(213, 'Crème de soja', 'https://i.pinimg.com/originals/17/61/c0/1761c0f8a823fa9dddd5fa0ebfd4c54e.jpg'),
(214, 'Fèves', 'https://i.pinimg.com/originals/b5/d3/39/b5d339f6d47fc28b674e30a4c3c6e5af.jpg'),
(215, 'Brocoli', 'https://i.pinimg.com/originals/8f/30/0a/8f300a0535e7f1a27fc6f6364e0348c3.jpg'),
(216, 'Vermicelles de riz', 'https://i.pinimg.com/originals/11/c1/7c/11c17cd279eeee9b6ca4cfeff045c155.jpg'),
(217, 'Confiture de framboise maison', 'https://i.pinimg.com/originals/2a/2c/4f/2a2c4f0aae2a83f351ed21f08706ed72.jpg'),
(218, 'Nouilles de blé', 'https://i.pinimg.com/originals/ac/15/0e/ac150e3cace6aa2eb82e6b5185fb613a.jpg'),
(219, 'Pâtes', 'https://i.pinimg.com/originals/fb/da/28/fbda28654b63d90034b599fddec1cae4.png'),
(220, 'Chocolat au lait', 'https://i.pinimg.com/originals/6a/0f/6e/6a0f6e678f0385ea00ef96545e8acd21.jpg'),
(221, 'Herbes de provence', 'https://i.pinimg.com/originals/94/cc/73/94cc73f7f3af0f6a4ac0822c020757a8.png'),
(222, 'Pain de mie complet', 'https://i.pinimg.com/originals/29/55/e2/2955e2407933f4baffa3f394a09a520c.png'),
(223, 'Polenta', 'https://i.pinimg.com/originals/05/8c/a7/058ca77559a4e03f9a9b3eadeaa05a89.png'),
(224, 'Patate douce', 'https://i.pinimg.com/originals/df/aa/be/dfaabed6de552bb7ab3510e75feee45d.jpg'),
(225, 'Radis noir', 'https://i.pinimg.com/originals/f6/0e/22/f60e22ab8d8ff15147ffa13e17f33bdf.jpg'),
(226, 'Noix de macadamia', 'https://i.pinimg.com/originals/52/21/2d/52212d3cac8b5cb460659a5ca45ab020.jpg'),
(227, 'Chou blanc', 'https://i.pinimg.com/originals/bc/e2/9e/bce29e57e4de9ba47135118cbbd4bf82.jpg'),
(228, 'Purée d\'amandes', 'https://i.pinimg.com/originals/a2/6b/29/a26b294074a3235566f394e1aef4276b.jpg'),
(229, 'Tofu soyeux', 'https://i.pinimg.com/originals/22/9e/14/229e14628a29b646a0f1a9203fc52053.png'),
(230, 'Yaourt grec', 'https://i.pinimg.com/originals/2b/f4/9d/2bf49d7da8815d75ec91375234e70d34.jpg'),
(231, 'Pâtes lentilles corail', 'https://i.pinimg.com/originals/5c/f6/35/5cf6358616a5c957c649deecd3521d25.jpg'),
(232, 'Vodka', 'https://i.pinimg.com/originals/5b/7b/fe/5b7bfe909725a0c0be00693a5fc60864.jpg'),
(233, 'Vinaigre de framboises', 'https://i.pinimg.com/originals/b7/cd/a0/b7cda0dce86f6dc84c4ee5750fa20916.jpg'),
(234, 'Oignons frits', 'https://i.pinimg.com/originals/a2/76/0a/a2760a603f8f56cbd67e9832a06e2569.webp'),
(235, 'Croutons aux herbes', 'https://i.pinimg.com/originals/fc/70/37/fc7037b7c80b996c9a3f50ac2f278a62.jpg'),
(236, 'Café expresso', 'https://i.pinimg.com/originals/23/cb/ba/23cbba8dc1a79a30796c5d631468cb0d.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id_recipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `id_recipe` int(11) DEFAULT NULL,
  `pseudo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `note` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `pseudo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `number_favorites` int(11) NOT NULL DEFAULT 0,
  `number_views` int(11) NOT NULL DEFAULT 0,
  `number_portion` int(11) NOT NULL,
  `name_portion` varchar(50) NOT NULL,
  `preparation_time` time NOT NULL DEFAULT '00:00:00',
  `rest_time` time NOT NULL DEFAULT '00:00:00',
  `cooking_time` time NOT NULL DEFAULT '00:00:00',
  `astuce` text DEFAULT NULL,
  `mot` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes_list`
--

CREATE TABLE `recipes_list` (
  `id` int(11) NOT NULL,
  `name_recipe` varchar(60) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT 0,
  `pseudo` varchar(30) NOT NULL,
  `id_recipe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes__categories`
--

CREATE TABLE `recipes__categories` (
  `id_category` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes__images`
--

CREATE TABLE `recipes__images` (
  `id_recipe` int(11) NOT NULL,
  `id_image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes__ingredients__units`
--

CREATE TABLE `recipes__ingredients__units` (
  `id_recipe` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `id_unit` int(11) NOT NULL,
  `quantity` float NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reset_token`
--

CREATE TABLE `reset_token` (
  `id` int(11) NOT NULL,
  `token` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `pseudo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shopping_list`
--

CREATE TABLE `shopping_list` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `name_ingredient` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `number` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `indication` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `pseudo` varchar(30) NOT NULL,
  `id_google` varchar(100) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `confirmed_email` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(64) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_subscribed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commentaires__images`
--
ALTER TABLE `commentaires__images`
  ADD PRIMARY KEY (`id_commentaire`,`id_image`),
  ADD KEY `fk_image_commentaire` (`id_image`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id_recipe`,`pseudo`),
  ADD KEY `fk_favorite_user` (`pseudo`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_menu` (`id_recipe`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notif_concerns_recipe` (`id_recipe`),
  ADD KEY `fk_notif_concerns_user` (`pseudo`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rating_concerns_recipe` (`id_recipe`),
  ADD KEY `fk_rating_concerns_user` (`pseudo`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `recipes_list`
--
ALTER TABLE `recipes_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_concerns_list` (`id_recipe`),
  ADD KEY `fk_pseudo_concerns_list` (`pseudo`);

--
-- Indexes for table `recipes__categories`
--
ALTER TABLE `recipes__categories`
  ADD PRIMARY KEY (`id_category`,`id_recipe`),
  ADD KEY `fk_categories_concern_recipes` (`id_recipe`);

--
-- Indexes for table `recipes__images`
--
ALTER TABLE `recipes__images`
  ADD PRIMARY KEY (`id_recipe`,`id_image`),
  ADD KEY `fk_images_concerns_recipe` (`id_image`);

--
-- Indexes for table `recipes__ingredients__units`
--
ALTER TABLE `recipes__ingredients__units`
  ADD PRIMARY KEY (`id_recipe`,`id_ingredient`,`id_unit`),
  ADD KEY `fk_ingredient_concerns_unit` (`id_unit`),
  ADD KEY `fk_ingredients` (`id_ingredient`);

--
-- Indexes for table `reset_token`
--
ALTER TABLE `reset_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_list`
--
ALTER TABLE `shopping_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingredient_concerns_shopping_list` (`id_ingredient`),
  ADD KEY `fk_user_concerns_shopping_list` (`pseudo`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`number`,`id_recipe`),
  ADD KEY `fk_steps_concern_recipe` (`id_recipe`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`pseudo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipes_list`
--
ALTER TABLE `recipes_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reset_token`
--
ALTER TABLE `reset_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shopping_list`
--
ALTER TABLE `shopping_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `commentaires__images`
--
ALTER TABLE `commentaires__images`
  ADD CONSTRAINT `fk_commentaire` FOREIGN KEY (`id_commentaire`) REFERENCES `commentaires` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_image_commentaire` FOREIGN KEY (`id_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `fk_favorite_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_favorite_user` FOREIGN KEY (`pseudo`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_recipe_menu` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notif_concerns_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notif_concerns_user` FOREIGN KEY (`pseudo`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_rating_concerns_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rating_concerns_user` FOREIGN KEY (`pseudo`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes_list`
--
ALTER TABLE `recipes_list`
  ADD CONSTRAINT `fk_pseudo_concerns_list` FOREIGN KEY (`pseudo`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_recipe_concerns_list` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes__categories`
--
ALTER TABLE `recipes__categories`
  ADD CONSTRAINT `fk_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_categories_concern_recipes` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes__images`
--
ALTER TABLE `recipes__images`
  ADD CONSTRAINT `fk_images_concerns_recipe` FOREIGN KEY (`id_image`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_recipes` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes__ingredients__units`
--
ALTER TABLE `recipes__ingredients__units`
  ADD CONSTRAINT `fk_ingredient_concerns_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ingredient_concerns_unit` FOREIGN KEY (`id_unit`) REFERENCES `units` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ingredients` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shopping_list`
--
ALTER TABLE `shopping_list`
  ADD CONSTRAINT `fk_ingredient_concerns_shopping_list` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_concerns_shopping_list` FOREIGN KEY (`pseudo`) REFERENCES `users` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `fk_steps_concern_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
