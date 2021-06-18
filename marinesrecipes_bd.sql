-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 18, 2021 at 12:55 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
(1141, 'Flocons d\'avoine', NULL),
(1142, 'Oeuf(s)', NULL),
(1143, 'Fleur de sel', NULL),
(1144, 'Farine', NULL),
(1145, 'Sucre', NULL),
(1146, 'Sucre vanillé', NULL),
(1147, 'Noix', NULL),
(1148, 'Épinards frais', NULL),
(1149, 'Eau', NULL),
(1150, 'Citron', NULL),
(1151, 'Sucre de canne bio', NULL),
(1152, 'Figue moelleuse bio', NULL),
(1153, 'Citron bio', NULL),
(1154, 'Souches de kéfir', NULL),
(1155, 'Banane', NULL),
(1156, 'Levure chimique', NULL),
(1157, 'Cacao amer', NULL),
(1158, 'Lait', NULL),
(1159, 'Pépites de chocolat', NULL),
(1160, 'Boulgour cru', NULL),
(1161, 'Chèvre frais', NULL),
(1162, 'Miel', NULL),
(1163, 'Vinaigre de riz', NULL),
(1164, 'Ail en poudre', NULL),
(1165, 'Poivre', NULL),
(1166, 'Nouilles de riz', NULL),
(1167, 'boeuf', NULL),
(1168, 'Carotte(s)', NULL),
(1169, 'Haricots plats', NULL),
(1170, 'Pousses de haricots', NULL),
(1171, 'Huile de coco', NULL),
(1172, 'Mélanges de fruits secs (amandes, noix, noisettes, noix de cajou, noix de pécan..)', NULL),
(1173, 'Extrait de vanille', NULL),
(1174, 'Levure boulangère sèche', NULL),
(1175, 'Sel', NULL),
(1176, 'Gingembre', NULL),
(1177, 'Coriandre', NULL),
(1178, 'Jus de pomme', NULL),
(1179, 'Banane(s) bien mûre(s)', NULL),
(1180, 'Huile', NULL),
(1181, 'Bicarbonate de soude', NULL),
(1182, 'Steack hachés % de matière grasse', NULL),
(1183, 'Sauce soja', NULL),
(1184, 'Oignon(s)', NULL),
(1185, 'Chocolat noir', NULL),
(1186, 'Beurre', NULL),
(1187, 'Blanc(s) de poulet(s)', NULL),
(1188, 'Huile de sésame', NULL),
(1189, 'Pois chiches', NULL),
(1190, 'Paprika', NULL),
(1191, 'Huile d\'olive', NULL),
(1192, 'Sirop d\'agave', NULL),
(1193, 'Pâte feuilletée', NULL),
(1194, 'Moutarde', NULL),
(1195, 'Tomates cerises', NULL),
(1196, 'Origan', NULL),
(1197, 'Mozzarella', NULL),
(1198, 'Courgette', NULL),
(1199, 'Gnocchi à poêler', NULL),
(1200, 'Jambon blanc', NULL),
(1201, 'Maïzena', NULL),
(1202, 'Noix de muscade', NULL),
(1203, 'Parmesan', NULL),
(1204, 'Pommes de terre', NULL),
(1205, 'Échalote(s)', NULL),
(1206, 'Gousse(s) d\'ail', NULL),
(1207, 'Cumin', NULL),
(1208, 'Tomates pelées', NULL),
(1209, 'Citron vert', NULL),
(1210, 'Persil', NULL),
(1211, 'Yaourt nature', NULL),
(1212, 'Farine semi-complète', NULL),
(1213, 'Fromage blanc %', NULL),
(1214, 'Bûche de chèvre', NULL),
(1215, 'Allumettes de bacon', NULL),
(1216, 'Bière', NULL),
(1217, 'Thon égoutté', NULL),
(1218, 'Curry', NULL),
(1219, 'Curcuma', NULL),
(1220, 'Haricots verts', NULL),
(1221, 'Vinaigre de cidre', NULL),
(1222, 'Fruits rouges', NULL),
(1223, 'Concentré de tomate', NULL),
(1224, 'Gruyère râpé', NULL),
(1225, 'Basilic frais', NULL),
(1226, 'Blanc d\'oeuf', NULL),
(1227, 'Purée de noisette', NULL),
(1228, 'Noisettes', NULL),
(1229, 'Salade', NULL),
(1230, 'Lentilles', NULL),
(1231, 'Radis', NULL),
(1232, 'Boursin', NULL),
(1233, 'Graines de pavot', NULL),
(1234, 'Vinaigre balsamique', NULL),
(1235, 'Noix de coco râpée', NULL),
(1236, 'Quinoa cru', NULL),
(1237, 'Viande hachée % de matière grasse', NULL),
(1238, 'Chocolat %', NULL),
(1239, 'Beurre de cacahuète', NULL),
(1240, 'Amandes', NULL),
(1241, 'Haricots rouges', NULL),
(1242, 'Maïs', NULL),
(1243, 'Purée de tomate', NULL),
(1244, 'Piment d\'espelette', NULL),
(1245, 'Poudre d\'amande', NULL),
(1246, 'Semoule', NULL),
(1247, 'Tomate(s)', NULL),
(1248, 'Poivron', NULL),
(1249, 'Menthe', NULL),
(1250, 'Sucre de coco', NULL),
(1251, 'Jaune d\'oeuf', NULL),
(1252, 'Nutella', NULL),
(1253, 'Wraps complets', NULL),
(1254, 'Riz basmati', NULL),
(1255, 'Protéines de soja', NULL),
(1256, 'Poireau(x)', NULL),
(1257, 'Oignon(s) rouge(s)', NULL),
(1258, 'Eau en bouteille', NULL),
(1259, 'Tagliatelles fraiches', NULL),
(1260, 'Fromage frais', NULL),
(1261, 'Feuilles de brick', NULL),
(1262, 'Thym', NULL),
(1263, 'Lait de coco', NULL),
(1264, 'Riz', NULL),
(1265, 'Framboises', NULL),
(1266, 'Levure boulangère fraîche', NULL),
(1267, 'Canelle', NULL),
(1268, 'Sucre perlée', NULL),
(1269, 'Cranberry', NULL),
(1270, 'Baies de goji', NULL),
(1271, 'Graines de chia', NULL),
(1272, 'Anis vert', NULL),
(1273, 'Mélange  épices', NULL),
(1274, 'Son d\'avoine', NULL),
(1275, 'Pomme', NULL),
(1276, 'Amandes effilées', NULL),
(1277, 'Noix concassées', NULL),
(1278, 'Cacahuète(s) non salée(s)', NULL),
(1279, 'Huile de tournesol', NULL),
(1280, 'Filet(s) de poulet', NULL),
(1281, 'Tige d\'oignon frais', NULL),
(1282, 'Sel rose', NULL),
(1283, 'Tabasco', NULL),
(1284, 'Tomates concassées', NULL),
(1285, 'Sucre de canne', NULL),
(1286, 'Tartare', NULL),
(1287, 'Vache qui rit', NULL),
(1288, 'Noix de pécan', NULL),
(1289, 'Spéculoos', NULL),
(1290, 'Knacki ball', NULL),
(1291, 'Lait en poudre', NULL),
(1292, 'Lentilles corail', NULL),
(1293, 'Concombre', NULL),
(1294, 'Graines (sésame, courge, tournesol, baie de gojie..)', NULL),
(1295, 'Tofu fumé', NULL),
(1296, 'Lait végétal', NULL),
(1297, 'Aneth', NULL),
(1298, 'Saumon fumé', NULL),
(1299, 'Myrtilles', NULL),
(1300, 'Bouillon cube', NULL),
(1301, 'Riz thaï complet', NULL),
(1302, 'Purée de chocolat noisette', NULL),
(1303, 'Mangue', NULL),
(1304, 'Haricots blancs', NULL),
(1305, 'Petits pois', NULL),
(1306, 'Oignon nouveau', NULL),
(1307, 'Pain aux céréales', NULL),
(1308, 'Jambon sec', NULL),
(1309, 'Graines de sésame', NULL),
(1310, 'Dattes', NULL),
(1311, 'Fraises', NULL),
(1312, 'Abricots', NULL),
(1313, 'Ciboulette', NULL),
(1314, 'Graines de sarrasin', NULL),
(1315, 'Graines de tournesol', NULL),
(1316, 'Noix de cajou', NULL),
(1317, 'Pomme granny', NULL),
(1318, 'Pommes grenailles', NULL),
(1319, 'Melon', NULL),
(1320, 'Lait d\'amandes', NULL),
(1321, 'Nectarines', NULL),
(1322, 'Cheddar rapé', NULL),
(1323, 'Chapelure', NULL),
(1324, 'Levure de bière', NULL),
(1325, 'Graines de courge', NULL),
(1326, 'Pain dure', NULL),
(1327, 'Granola', NULL),
(1328, 'Vermicelles d\'haricots mungo', NULL),
(1329, 'Feuilles de riz', NULL),
(1330, 'Chou rouge', NULL),
(1331, 'Purée de sésame (Tahin)', NULL),
(1332, 'Avocat', NULL),
(1333, 'Haché végétal', NULL),
(1334, 'Pulpe de tomate', NULL),
(1335, 'Vinaigre de vin rouge', NULL),
(1336, 'Feuille de laurier', NULL),
(1337, 'Feuilles de gélatine', NULL),
(1338, 'Framboises lyophilisées', NULL),
(1339, 'Crispy soja', NULL),
(1340, 'Courge spaghetti', NULL),
(1341, 'Vin blanc', NULL),
(1342, 'Plaques de ravioles', NULL),
(1343, 'Mimolette', NULL),
(1344, 'Sucre complet', NULL),
(1345, 'Compote sans sucres ajoutés', NULL),
(1346, 'Ananas', NULL),
(1347, 'Épinards à la crème', NULL),
(1348, 'Eau filtrée', NULL),
(1349, 'Whey chocolat caramel', NULL),
(1350, 'Dos de cabillaud', NULL),
(1351, 'Blanc(s) de poireau(x)', NULL),
(1352, 'Crème de coco', NULL),
(1353, 'Crème de soja', NULL),
(1354, 'Fèves', NULL),
(1355, 'Brocoli', NULL),
(1356, 'Vermicelles de riz', NULL),
(1357, 'Confiture de framboise maison', NULL),
(1358, 'Nouilles de blé', NULL),
(1359, 'Pâtes', NULL),
(1360, 'Chocolat au lait', NULL),
(1361, 'Herbes de provence', NULL),
(1362, 'Pain de mie complet', NULL),
(1363, 'Polenta', NULL),
(1364, 'Patate douce', NULL),
(1365, 'Radis noir', NULL),
(1366, 'Noix de macadamia', NULL),
(1367, 'Chou blanc', NULL),
(1368, 'Purée d\'amandes', NULL);

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
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
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
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `number_favorites` int(11) NOT NULL DEFAULT '0',
  `number_views` int(11) NOT NULL DEFAULT '0',
  `number_portion` int(11) NOT NULL,
  `name_portion` varchar(50) NOT NULL,
  `preparation_time` time NOT NULL DEFAULT '00:00:00',
  `rest_time` time NOT NULL DEFAULT '00:00:00',
  `cooking_time` time NOT NULL DEFAULT '00:00:00',
  `astuce` text,
  `mot` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recipes_list`
--

CREATE TABLE `recipes_list` (
  `id` int(11) NOT NULL,
  `name_recipe` varchar(60) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
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
  `quantity` float NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reset_token`
--

CREATE TABLE `reset_token` (
  `id` int(11) NOT NULL,
  `token` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`) VALUES
(1, ' '),
(2, 'g'),
(3, 'kg'),
(4, 'cl'),
(5, 'ml'),
(6, 'L'),
(7, 'cuillère(s) à café'),
(8, 'cuillère(s) à soupe'),
(9, 'paquet(s)'),
(10, 'poignée(s)'),
(11, 'pincée(s)'),
(12, 'sachet(s)'),
(13, 'pot(s)'),
(14, 'tranche(s)'),
(15, 'filet(s)'),
(16, 'noisette(s)'),
(17, 'verre(s)'),
(18, 'feuille(s)'),
(19, 'carreau(x) '),
(20, 'Goutte(s) '),
(21, 'Barre(s) '),
(22, 'boîte(s)'),
(23, 'brin(s)');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `pseudo` varchar(30) NOT NULL,
  `id_google` varchar(100) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `confirmed_email` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(64) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `is_subscribed` tinyint(1) NOT NULL DEFAULT '0'
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1369;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
