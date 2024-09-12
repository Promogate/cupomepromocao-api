-- CreateTable
CREATE TABLE "stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "thumbnail_background" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "has_cashback" BOOLEAN NOT NULL DEFAULT false,
    "provider" TEXT,
    "provider_id" TEXT NOT NULL,
    "cashback_amount" TEXT,
    "cashback_destination_url" TEXT,
    "out_intent_offer" TEXT,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "usage" INTEGER NOT NULL,
    "destination_link" TEXT NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "promo_code" TEXT,
    "offer_main_message" TEXT,
    "campaign" TEXT,
    "cep_campaign" TEXT[],
    "terms" TEXT,
    "provider_offer_id" TEXT,
    "is_sponsored" BOOLEAN NOT NULL DEFAULT false,
    "is_cashback" BOOLEAN NOT NULL DEFAULT false,
    "is_special" BOOLEAN NOT NULL DEFAULT false,
    "is_exclusive" BOOLEAN NOT NULL DEFAULT false,
    "cashback_amount" INTEGER,
    "provider_id" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stores_provider_id_key" ON "stores"("provider_id");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "stores"("provider_id") ON DELETE RESTRICT ON UPDATE CASCADE;
