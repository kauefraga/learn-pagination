CREATE TABLE IF NOT EXISTS users (
  -- it is recommended to used GENERATED ALWAYS AS IDENTITY instead of SERIAL
  -- because SERIAL is an old implementation of postgres
  -- on the other hand, GAAI is SQL compliant
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  public_id UUID UNIQUE DEFAULT gen_random_uuid(),
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
