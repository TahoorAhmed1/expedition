-- CreateEnum
CREATE TYPE "ADMIN_ROLES" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "CONTENT_TYPE" AS ENUM ('PICTURE', 'VIDEO');

-- CreateEnum
CREATE TYPE "SUBSCRIPTION_STATUS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "picture" TEXT,
    "role" "ADMIN_ROLES" NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "picture" TEXT,
    "author" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quotation" TEXT,
    "content" TEXT NOT NULL,
    "picture" TEXT,
    "author" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "time" TIMESTAMP NOT NULL,
    "picture" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "provider" TEXT,
    "emailOtp" TEXT,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "staus" "SUBSCRIPTION_STATUS" NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donations" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userId" INTEGER,
    "email" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationDetails" (
    "id" SERIAL NOT NULL,
    "donationId" INTEGER NOT NULL,
    "giftId" INTEGER,
    "donorAddressId" INTEGER,
    "honoreeId" INTEGER,

    CONSTRAINT "DonationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddresses" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "ShippingAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Honorees" (
    "id" SERIAL NOT NULL,
    "tributeType" TEXT NOT NULL,
    "tributeName" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "sendCard" BOOLEAN NOT NULL DEFAULT false,
    "numberOfCards" INTEGER,

    CONSTRAINT "Honorees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gifts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stories" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "type" "CONTENT_TYPE" NOT NULL,
    "url" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "picture" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_userId_key" ON "Authentication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DonationDetails_donationId_key" ON "DonationDetails"("donationId");

-- CreateIndex
CREATE UNIQUE INDEX "DonationDetails_donorAddressId_key" ON "DonationDetails"("donorAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "DonationDetails_honoreeId_key" ON "DonationDetails"("honoreeId");

-- CreateIndex
CREATE UNIQUE INDEX "Honorees_addressId_key" ON "Honorees"("addressId");

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_author_fkey" FOREIGN KEY ("author") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_author_fkey" FOREIGN KEY ("author") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetails" ADD CONSTRAINT "DonationDetails_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetails" ADD CONSTRAINT "DonationDetails_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetails" ADD CONSTRAINT "DonationDetails_honoreeId_fkey" FOREIGN KEY ("honoreeId") REFERENCES "Honorees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDetails" ADD CONSTRAINT "DonationDetails_donorAddressId_fkey" FOREIGN KEY ("donorAddressId") REFERENCES "ShippingAddresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Honorees" ADD CONSTRAINT "Honorees_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "ShippingAddresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
