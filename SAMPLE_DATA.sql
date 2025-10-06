-- 🎯 Données d'exemple pour tester SummitPlan
-- Execute ce fichier APRÈS avoir exécuté SUPABASE_SCHEMA.sql

-- Note: Remplace '00000000-0000-0000-0000-000000000000' par ton vrai user_id
-- Tu peux obtenir ton user_id en te connectant puis en faisant: SELECT auth.uid();

-- 🏔️ Exemple 1: Ascension du Mont Blanc
INSERT INTO trips (id, name, type, start_date, end_date, description, status, user_id) VALUES
('11111111-1111-1111-1111-111111111111', 'Ascension Mont Blanc', 'ascension', '2024-07-15', '2024-07-20', 'Première tentative du toit de l''Europe ! Objectif: sommet à 4808m', 'planification', '00000000-0000-0000-0000-000000000000');

-- Sommet
INSERT INTO summits (trip_id, name, altitude, coordinates_lat, coordinates_lng, summit_date, notes) VALUES
('11111111-1111-1111-1111-111111111111', 'Mont Blanc', 4808, 45.8326, 6.8652, '2024-07-19', 'Voie normale via le Goûter. Départ 2h du matin pour éviter les séracs.');

-- Étapes
INSERT INTO daily_stages (trip_id, day_number, date, location, altitude, coordinates_lat, coordinates_lng, activities, notes) VALUES
('11111111-1111-1111-1111-111111111111', 1, '2024-07-15', 'Les Houches', 1000, 45.8931, 6.7992, 'Arrivée et acclimatation, vérification du matériel', 'Nuit à l''hôtel'),
('11111111-1111-1111-1111-111111111111', 2, '2024-07-16', 'Refuge de Tête Rousse', 3167, 45.8543, 6.8445, 'Montée au refuge, 4h de marche', 'Nuit en refuge'),
('11111111-1111-1111-1111-111111111111', 3, '2024-07-17', 'Refuge du Goûter', 3817, 45.8512, 6.8308, 'Traversée du Grand Couloir, arrivée au Goûter', 'Nuit en refuge, repos avant le sommet'),
('11111111-1111-1111-1111-111111111111', 4, '2024-07-18', 'Refuge du Goûter', 3817, 45.8512, 6.8308, 'Repos et préparation finale', 'Coucher tôt, réveil 1h30'),
('11111111-1111-1111-1111-111111111111', 5, '2024-07-19', 'Sommet Mont Blanc', 4808, 45.8326, 6.8652, 'JOUR DU SOMMET ! Départ 2h, arrivée sommet vers 9h, redescente aux Houches', 'Journée intense !'),
('11111111-1111-1111-1111-111111111111', 6, '2024-07-20', 'Retour Chamonix', 1035, 45.9237, 6.8694, 'Repos et célébration !', 'Shopping souvenirs');

-- Matériel
INSERT INTO equipment (trip_id, name, category, weight_grams, luggage, packed, notes) VALUES
('11111111-1111-1111-1111-111111111111', 'Piolet', 'materiel_montagne', 450, 'sac_a_dos', true, 'Petzl Summit Evo'),
('11111111-1111-1111-1111-111111111111', 'Crampons', 'materiel_montagne', 900, 'sac_a_dos', true, 'Grivel G12'),
('11111111-1111-1111-1111-111111111111', 'Baudrier', 'materiel_montagne', 380, 'sac_a_dos', true, null),
('11111111-1111-1111-1111-111111111111', 'Casque', 'materiel_montagne', 230, 'sac_a_dos', true, 'Petzl Meteor'),
('11111111-1111-1111-1111-111111111111', 'Veste Gore-Tex', 'vetement', 520, 'sac_a_dos', false, 'Arc''teryx rouge'),
('11111111-1111-1111-1111-111111111111', 'Doudoune', 'vetement', 650, 'sac_a_dos', false, 'Montbell 800 fill'),
('11111111-1111-1111-1111-111111111111', 'Chaussures haute montagne', 'materiel_montagne', 1800, 'sac_a_dos', true, 'Scarpa Mont Blanc Pro GTX'),
('11111111-1111-1111-1111-111111111111', 'Sac de couchage -15°C', 'camping', 1200, 'sac_a_dos', false, null),
('11111111-1111-1111-1111-111111111111', 'Frontale', 'electronique', 80, 'sac_a_dos', true, 'Petzl Actik Core + piles de rechange'),
('11111111-1111-1111-1111-111111111111', 'Lunettes glacier', 'materiel_montagne', 35, 'sac_a_dos', true, 'Catégorie 4');

-- Acclimatation
INSERT INTO acclimatization_sessions (trip_id, date, duration_hours, altitude_simulated, notes) VALUES
('11111111-1111-1111-1111-111111111111', '2024-06-15', 2.0, 3500, 'Première séance, FC moyenne 85 bpm'),
('11111111-1111-1111-1111-111111111111', '2024-06-22', 3.0, 4000, 'Bien toléré, lecture pendant la séance'),
('11111111-1111-1111-1111-111111111111', '2024-06-29', 4.0, 4500, 'Séance longue, petit mal de tête en fin'),
('11111111-1111-1111-1111-111111111111', '2024-07-06', 3.5, 5000, 'Altitude maximale, bien géré'),
('11111111-1111-1111-1111-111111111111', '2024-07-13', 2.0, 4000, 'Dernière séance avant départ');

-- Transports
INSERT INTO transport_tickets (trip_id, type, order_number, departure, arrival, departure_time, arrival_time, booking_reference, notes) VALUES
('11111111-1111-1111-1111-111111111111', 'avion', 1, 'Paris CDG', 'Genève', '2024-07-15 08:30:00', '2024-07-15 09:45:00', 'AF1234', 'Air France, Terminal 2F'),
('11111111-1111-1111-1111-111111111111', 'bus', 2, 'Genève Aéroport', 'Chamonix', '2024-07-15 11:00:00', '2024-07-15 12:30:00', 'FLIXBUS789', 'FlixBus direct'),
('11111111-1111-1111-1111-111111111111', 'bus', 3, 'Chamonix', 'Les Houches', '2024-07-15 14:00:00', '2024-07-15 14:20:00', null, 'Navette locale'),
('11111111-1111-1111-1111-111111111111', 'bus', 4, 'Chamonix', 'Genève Aéroport', '2024-07-20 14:00:00', '2024-07-20 15:30:00', 'FLIXBUS790', 'FlixBus retour'),
('11111111-1111-1111-1111-111111111111', 'avion', 5, 'Genève', 'Paris CDG', '2024-07-20 18:15:00', '2024-07-20 19:30:00', 'AF1235', 'Air France');

-- Dépenses
INSERT INTO expenses (trip_id, date, description, amount, currency, category, exchange_rate, amount_home_currency, notes) VALUES
('11111111-1111-1111-1111-111111111111', '2024-07-15', 'Billet avion Paris-Genève', 180.00, 'EUR', 'transport', 1.0, 180.00, null),
('11111111-1111-1111-1111-111111111111', '2024-07-15', 'Bus Genève-Chamonix', 35.00, 'EUR', 'transport', 1.0, 35.00, null),
('11111111-1111-1111-1111-111111111111', '2024-07-15', 'Hôtel Les Houches', 85.00, 'EUR', 'hebergement', 1.0, 85.00, 'Nuit du 15'),
('11111111-1111-1111-1111-111111111111', '2024-07-15', 'Restaurant Le Prarion', 28.50, 'EUR', 'nourriture', 1.0, 28.50, 'Fondue savoyarde'),
('11111111-1111-1111-1111-111111111111', '2024-07-16', 'Refuge Tête Rousse', 65.00, 'EUR', 'hebergement', 1.0, 65.00, 'Demi-pension'),
('11111111-1111-1111-1111-111111111111', '2024-07-17', 'Refuge du Goûter', 75.00, 'EUR', 'hebergement', 1.0, 75.00, 'Demi-pension x2 nuits'),
('11111111-1111-1111-1111-111111111111', '2024-07-19', 'Coca sommet', 5.00, 'EUR', 'nourriture', 1.0, 5.00, 'Tradition !'),
('11111111-1111-1111-1111-111111111111', '2024-07-20', 'Restaurant Chamonix', 45.00, 'EUR', 'nourriture', 1.0, 45.00, 'Célébration !');

-- 🗾 Exemple 2: Voyage au Japon
INSERT INTO trips (id, name, type, start_date, end_date, description, status, user_id) VALUES
('22222222-2222-2222-2222-222222222222', 'Découverte du Japon', 'voyage', '2024-10-01', '2024-10-15', 'Circuit culturel : Tokyo, Kyoto, Osaka et Mont Fuji', 'planification', '00000000-0000-0000-0000-000000000000');

-- Étapes Japon
INSERT INTO daily_stages (trip_id, day_number, date, location, altitude, coordinates_lat, coordinates_lng, activities, notes) VALUES
('22222222-2222-2222-2222-222222222222', 1, '2024-10-01', 'Tokyo - Shibuya', 40, 35.6628, 139.7039, 'Arrivée, crossing de Shibuya, quartier de Harajuku', 'Jet lag attendu'),
('22222222-2222-2222-2222-222222222222', 2, '2024-10-02', 'Tokyo - Asakusa', 10, 35.7148, 139.7967, 'Temple Senso-ji, Nakamise shopping street, Tokyo Skytree', 'Journée culture'),
('22222222-2222-2222-2222-222222222222', 3, '2024-10-03', 'Mont Fuji', 2300, 35.3606, 138.7278, 'Excursion 5ème station Mont Fuji, lac Kawaguchi', 'Prévoir vêtements chauds'),
('22222222-2222-2222-2222-222222222222', 4, '2024-10-04', 'Kyoto - Fushimi Inari', 233, 34.9671, 135.7727, 'Sanctuaire aux 10000 torii, balade dans les collines', 'Arrivée tôt pour éviter la foule'),
('22222222-2222-2222-2222-222222222222', 5, '2024-10-05', 'Kyoto - Arashiyama', 100, 35.0094, 135.6694, 'Forêt de bambous, temple Tenryu-ji, pont Togetsukyo', 'Location de vélos possible');

-- Transports Japon
INSERT INTO transport_tickets (trip_id, type, order_number, departure, arrival, departure_time, arrival_time, booking_reference, notes) VALUES
('22222222-2222-2222-2222-222222222222', 'avion', 1, 'Paris CDG', 'Tokyo Narita', '2024-10-01 11:30:00', '2024-10-02 06:45:00+09', 'JL123456', 'Japan Airlines, vol direct'),
('22222222-2222-2222-2222-222222222222', 'train', 2, 'Narita Airport', 'Tokyo Station', '2024-10-02 08:30:00', '2024-10-02 09:30:00', null, 'Narita Express'),
('22222222-2222-2222-2222-222222222222', 'train', 3, 'Tokyo', 'Kyoto', '2024-10-04 09:00:00', '2024-10-04 11:15:00', null, 'Shinkansen Nozomi - JR Pass'),
('22222222-2222-2222-2222-222222222222', 'train', 4, 'Kyoto', 'Tokyo', '2024-10-13 15:30:00', '2024-10-13 17:45:00', null, 'Shinkansen Hikari');

-- Dépenses Japon
INSERT INTO expenses (trip_id, date, description, amount, currency, category, exchange_rate, amount_home_currency, notes) VALUES
('22222222-2222-2222-2222-222222222222', '2024-09-01', 'Vol Paris-Tokyo A/R', 850.00, 'EUR', 'transport', 1.0, 850.00, 'Japan Airlines'),
('22222222-2222-2222-2222-222222222222', '2024-09-01', 'JR Pass 7 jours', 280.00, 'EUR', 'transport', 1.0, 280.00, 'Trains illimités'),
('22222222-2222-2222-2222-222222222222', '2024-10-02', 'Petit-déj konbini', 650, 'JPY', 'nourriture', 0.0064, 4.16, '7-Eleven'),
('22222222-2222-2222-2222-222222222222', '2024-10-02', 'Ramen Ichiran', 1200, 'JPY', 'nourriture', 0.0064, 7.68, 'Délicieux !'),
('22222222-2222-2222-2222-222222222222', '2024-10-02', 'Hôtel Tokyo', 12000, 'JPY', 'hebergement', 0.0064, 76.80, 'Nuit du 2 au 3'),
('22222222-2222-2222-2222-222222222222', '2024-10-03', 'Bus Mont Fuji', 2800, 'JPY', 'transport', 0.0064, 17.92, 'A/R depuis Shinjuku'),
('22222222-2222-2222-2222-222222222222', '2024-10-04', 'Déjeuner bento', 890, 'JPY', 'nourriture', 0.0064, 5.70, 'Dans le Shinkansen'),
('22222222-2222-2222-2222-222222222222', '2024-10-05', 'Location vélos', 1500, 'JPY', 'activite', 0.0064, 9.60, 'Journée complète Arashiyama');

-- Matériel Japon
INSERT INTO equipment (trip_id, name, category, weight_grams, luggage, packed, notes) VALUES
('22222222-2222-2222-2222-222222222222', 'Adaptateur prise JP', 'electronique', 50, 'bagage_main', true, 'Type A'),
('22222222-2222-2222-2222-222222222222', 'Guide Lonely Planet Japon', 'autre', 380, 'sac_a_dos', false, null),
('22222222-2222-2222-2222-222222222222', 'Baskets confort', 'vetement', 650, 'valise', false, 'Beaucoup de marche'),
('22222222-2222-2222-2222-222222222222', 'Appareil photo', 'electronique', 580, 'bagage_main', true, 'Sony A7 + 2 batteries'),
('22222222-2222-2222-2222-222222222222', 'Veste légère', 'vetement', 320, 'valise', false, 'Pour les soirées fraîches');

-- 🏔️ Exemple 3: Trek Népal
INSERT INTO trips (id, name, type, start_date, end_date, description, status, user_id) VALUES
('33333333-3333-3333-3333-333333333333', 'Camp de Base Everest', 'ascension', '2024-11-01', '2024-11-18', 'Trek jusqu''au camp de base de l''Everest (5364m)', 'planification', '00000000-0000-0000-0000-000000000000');

-- Sommet/Objectif
INSERT INTO summits (trip_id, name, altitude, coordinates_lat, coordinates_lng, summit_date, notes) VALUES
('33333333-3333-3333-3333-333333333333', 'Everest Base Camp', 5364, 28.0026, 86.8528, '2024-11-12', 'Objectif : arriver au camp de base, pas le sommet !');

-- Dépenses Népal
INSERT INTO expenses (trip_id, date, description, amount, currency, category, notes) VALUES
('33333333-3333-3333-3333-333333333333', '2024-09-15', 'Vol Paris-Katmandou', 780.00, 'EUR', 'transport', 'Turkish Airlines via Istanbul'),
('33333333-3333-3333-3333-333333333333', '2024-11-02', 'Permis TIMS', 2000, 'NPR', 'activite', 'Trekkers Information Management System'),
('33333333-3333-3333-3333-333333333333', '2024-11-02', 'Permis Parc National', 3000, 'NPR', 'activite', 'Sagarmatha National Park'),
('33333333-3333-3333-3333-333333333333', '2024-11-03', 'Guide pour 15 jours', 45000, 'NPR', 'activite', 'Guide local recommandé'),
('33333333-3333-3333-3333-333333333333', '2024-11-03', 'Dal Bhat', 800, 'NPR', 'nourriture', 'Plat traditionnel népalais');

-- ✅ Données insérées avec succès !
-- Tu peux maintenant tester toutes les fonctionnalités de l'app

-- 💡 Pour voir les données :
-- SELECT * FROM trips;
-- SELECT * FROM summits;
-- SELECT * FROM daily_stages;
-- etc.
