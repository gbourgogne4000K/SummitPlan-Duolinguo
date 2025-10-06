-- SummitPlan Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Trips table (Voyages et Ascensions)
create table trips (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null check (type in ('voyage', 'ascension')),
  start_date date not null,
  end_date date not null,
  description text,
  status text default 'planification' check (status in ('planification', 'en_cours', 'termine')),
  user_id uuid references auth.users not null
);

-- Summits table
create table summits (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  name text not null,
  altitude integer not null,
  coordinates_lat decimal(10, 8),
  coordinates_lng decimal(11, 8),
  summit_date date,
  notes text
);

-- Daily stages (Étapes quotidiennes)
create table daily_stages (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  day_number integer not null,
  date date not null,
  location text not null,
  altitude integer,
  coordinates_lat decimal(10, 8),
  coordinates_lng decimal(11, 8),
  activities text,
  notes text
);

-- Equipment (Matériel et valises)
create table equipment (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  name text not null,
  category text not null check (category in ('vetement', 'materiel_montagne', 'camping', 'electronique', 'autre')),
  weight_grams integer,
  luggage text check (luggage in ('sac_a_dos', 'valise', 'bagage_main')),
  packed boolean default false,
  notes text
);

-- Acclimatization sessions
create table acclimatization_sessions (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  date date not null,
  duration_hours decimal(4, 2) not null,
  altitude_simulated integer,
  notes text
);

-- Transport tickets
create table transport_tickets (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  type text not null check (type in ('avion', 'train', 'bus', 'autre')),
  order_number integer not null,
  departure text not null,
  arrival text not null,
  departure_time timestamp with time zone not null,
  arrival_time timestamp with time zone,
  booking_reference text,
  notes text
);

-- Expenses (Dépenses)
create table expenses (
  id uuid default uuid_generate_v4() primary key,
  trip_id uuid references trips(id) on delete cascade not null,
  date date not null,
  description text not null,
  amount decimal(10, 2) not null,
  currency text not null,
  category text not null check (category in ('transport', 'hebergement', 'nourriture', 'materiel', 'activite', 'autre')),
  exchange_rate decimal(10, 6),
  amount_home_currency decimal(10, 2),
  notes text
);

-- Enable Row Level Security
alter table trips enable row level security;
alter table summits enable row level security;
alter table daily_stages enable row level security;
alter table equipment enable row level security;
alter table acclimatization_sessions enable row level security;
alter table transport_tickets enable row level security;
alter table expenses enable row level security;

-- Create policies (adjust based on your auth requirements)
-- For now, allow authenticated users to manage their own trips
create policy "Users can view own trips" on trips for select using (auth.uid() = user_id);
create policy "Users can insert own trips" on trips for insert with check (auth.uid() = user_id);
create policy "Users can update own trips" on trips for update using (auth.uid() = user_id);
create policy "Users can delete own trips" on trips for delete using (auth.uid() = user_id);

-- Policies for related tables (they inherit trip ownership)
create policy "Users can view summits" on summits for select using (
  exists (select 1 from trips where trips.id = summits.trip_id and trips.user_id = auth.uid())
);
create policy "Users can insert summits" on summits for insert with check (
  exists (select 1 from trips where trips.id = summits.trip_id and trips.user_id = auth.uid())
);
create policy "Users can update summits" on summits for update using (
  exists (select 1 from trips where trips.id = summits.trip_id and trips.user_id = auth.uid())
);
create policy "Users can delete summits" on summits for delete using (
  exists (select 1 from trips where trips.id = summits.trip_id and trips.user_id = auth.uid())
);

-- Similar policies for other tables
create policy "Users can manage daily_stages" on daily_stages for all using (
  exists (select 1 from trips where trips.id = daily_stages.trip_id and trips.user_id = auth.uid())
);

create policy "Users can manage equipment" on equipment for all using (
  exists (select 1 from trips where trips.id = equipment.trip_id and trips.user_id = auth.uid())
);

create policy "Users can manage acclimatization_sessions" on acclimatization_sessions for all using (
  exists (select 1 from trips where trips.id = acclimatization_sessions.trip_id and trips.user_id = auth.uid())
);

create policy "Users can manage transport_tickets" on transport_tickets for all using (
  exists (select 1 from trips where trips.id = transport_tickets.trip_id and trips.user_id = auth.uid())
);

create policy "Users can manage expenses" on expenses for all using (
  exists (select 1 from trips where trips.id = expenses.trip_id and trips.user_id = auth.uid())
);

-- Create indexes for better performance
create index trips_user_id_idx on trips(user_id);
create index summits_trip_id_idx on summits(trip_id);
create index daily_stages_trip_id_idx on daily_stages(trip_id);
create index equipment_trip_id_idx on equipment(trip_id);
create index acclimatization_sessions_trip_id_idx on acclimatization_sessions(trip_id);
create index transport_tickets_trip_id_idx on transport_tickets(trip_id);
create index expenses_trip_id_idx on expenses(trip_id);
