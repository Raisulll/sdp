-- ======= CORE ACCOUNT SYSTEM =======
create table all_users (
   all_user_id uuid primary key,
   email       varchar(255) unique not null,
   role        varchar(20) not null,
   created_at  timestamp default current_timestamp
);

create table users (
   user_id         uuid primary key,
   all_user_id     uuid unique not null,
   full_name       varchar(255) not null,
   password_hash   text not null,
   phone_number    varchar(20) unique not null,
   profile_picture text,
   created_at      timestamp default current_timestamp,
   foreign key ( all_user_id )
      references all_users ( all_user_id )
);

create table publishers (
   publisher_id    uuid primary key,
   all_user_id     uuid unique not null,
   name            varchar(255) not null,
   password_hash   text not null,
   phone_number    varchar(20) unique not null,
   profile_picture text,
   created_at      timestamp default current_timestamp,
   foreign key ( all_user_id )
      references all_users ( all_user_id )
);

create table admins (
   admin_id      uuid primary key,
   all_user_id   uuid unique not null,
   full_name     varchar(255) not null,
   password_hash text not null,
   phone_number  varchar(20) unique not null,
   created_at    timestamp default current_timestamp,
   foreign key ( all_user_id )
      references all_users ( all_user_id )
);

-- ======= BOOK SYSTEM =======
create table book_categories (
   category_id   uuid primary key,
   category_name varchar(100) not null
);

create table books (
   book_id       uuid primary key,
   publisher_id  uuid not null,
   category_id   uuid not null,
   title         varchar(255) not null,
   genre         varchar(100),
   description   text,
   cover_image   text,
   pdf_preview   text,
   audiobook_url text,
   published_at  date,
   price         decimal,
   created_at    timestamp default current_timestamp,
   foreign key ( publisher_id )
      references publishers ( publisher_id ),
   foreign key ( category_id )
      references book_categories ( category_id )
);

-- ======= USER INTERACTIONS =======
create table reviews (
   review_id  uuid primary key,
   book_id    uuid not null,
   user_id    uuid not null,
   rating     int check ( rating >= 1
      and rating <= 5 ),
   comment    text,
   created_at timestamp default current_timestamp,
   foreign key ( book_id )
      references books ( book_id ),
   foreign key ( user_id )
      references users ( user_id )
);

create table wishlists (
   wishlist_id uuid primary key,
   user_id     uuid not null,
   book_id     uuid not null,
   added_at    timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( book_id )
      references books ( book_id )
);

create table ratings (
   rating_id      uuid primary key,
   user_id        uuid not null,
   book_id        uuid not null,
   rating         int check ( rating >= 1
      and rating <= 5 ),
   review_comment text,
   created_at     timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( book_id )
      references books ( book_id )
);

create table bookmarks (
   bookmark_id uuid primary key,
   user_id     uuid not null,
   entity_id   uuid not null,
   entity_type varchar(20) not null,
   created_at  timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

-- ======= TRANSACTION SYSTEM =======
create table transactions (
   transaction_id uuid primary key,
   user_id        uuid not null,
   book_id        uuid not null,
   amount         decimal not null,
   status         varchar(50) not null,
   created_at     timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( book_id )
      references books ( book_id )
);

create table subscriptions (
   subscription_id uuid primary key,
   user_id         uuid not null,
   plan_type       varchar(50) not null,
   price           decimal not null,
   start_date      date not null,
   end_date        date not null,
   created_at      timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

create table payment_methods (
   payment_id  uuid primary key,
   user_id     uuid not null,
   card_number text not null,
   expiry_date date not null,
   card_type   varchar(50) not null,
   created_at  timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

-- ======= BLOG & SOCIAL SYSTEM =======
create table blogs (
   blog_id    uuid primary key,
   user_id    uuid not null,
   title      varchar(255) not null,
   content    text not null,
   created_at timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

create table comments (
   comment_id uuid primary key,
   blog_id    uuid not null,
   user_id    uuid not null,
   content    text not null,
   created_at timestamp default current_timestamp,
   foreign key ( blog_id )
      references blogs ( blog_id ),
   foreign key ( user_id )
      references users ( user_id )
);

create table likes (
   like_id     uuid primary key,
   user_id     uuid not null,
   entity_id   uuid not null,
   entity_type varchar(20) not null,
   created_at  timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

create table followers (
   follower_id  uuid primary key,
   user_id      uuid not null,
   publisher_id uuid not null,
   created_at   timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id ),
   foreign key ( publisher_id )
      references publishers ( publisher_id )
);

create table notifications (
   notification_id uuid primary key,
   user_id         uuid not null,
   message         text not null,
   status          varchar(20) not null,
   created_at      timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);

-- ======= REPORTING & AI SYSTEM =======
create table reports (
   report_id     uuid primary key,
   reporter_id   uuid not null,
   comment_id    uuid not null,
   report_reason text not null,
   status        varchar(20) not null,
   created_at    timestamp default current_timestamp,
   reviewed_by   uuid,
   reviewed_at   timestamp,
   foreign key ( reporter_id )
      references users ( user_id ),
   foreign key ( comment_id )
      references comments ( comment_id ),
   foreign key ( reviewed_by )
      references admins ( admin_id )
);

create table ai_chat_bot (
   log_id     uuid primary key,
   user_id    uuid not null,
   message    text not null,
   response   text not null,
   created_at timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( user_id )
);