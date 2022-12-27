CREATE TABLE "Country" (
  "countryId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "population" integer NOT NULL
);

ALTER TABLE "Country" ADD CONSTRAINT "pkCountry" PRIMARY KEY ("countryId");

CREATE TABLE "User" (
  "userId" bigint generated always as identity,
  "login" varchar NOT NULL,
  "password" varchar NOT NULL,
  "age" integer NOT NULL
);

ALTER TABLE "User" ADD CONSTRAINT "pkUser" PRIMARY KEY ("userId");
