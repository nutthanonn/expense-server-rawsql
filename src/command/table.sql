CREATE TABLE IF NOT EXISTS card (
	card_number CHAR(19) PRIMARY KEY,
	balance FLOAT
);

CREATE TABLE IF NOT EXISTS "transection" (
	transection_id uuid PRIMARY KEY,
	title VARCHAR(255),
	transection_type VARCHAR(255),
	transection_date DATE,
	amount FLOAT,
	card_id  CHAR(19) REFERENCES card(card_number)
)