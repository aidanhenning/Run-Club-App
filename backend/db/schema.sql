DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clubs;
DROP TABLE IF EXISTS club_memberships;
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_pictures;
DROP TABLE IF EXISTS post_attendees;
DROP TABLE IF EXISTS post_comments;
DROP TABLE IF EXISTS post_likes;

CREATE TABLE users (
    id UUID PRIMARY KEY gen_random_uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_picture_url VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE clubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    owner UUID NOT NULL REFERENCES users(id) 
);

CREATE TABLE club_memberships (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    runs_with_club INT NOT NULL DEFAULT 0
);

CREATE TABLE followers (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    followed_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    club_id UUID REFERENCES clubs(id),
    host_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    time TIME NOT NULL,
    type_of_run VARCHAR(50),
    distance DECIMAL(10, 2),
    terrain VARCHAR(100),
    address VARCHAR(255),
    devo TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post_pictures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post_attendees (
    attendee_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    attended_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (post_id, user_id),
    CONSTRAINT chk_like_type CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL) OR
        (comment_id IS NOT NULL AND post_id IS NULL)
    )
);