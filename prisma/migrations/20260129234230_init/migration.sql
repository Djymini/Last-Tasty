-- CreateTable
CREATE TABLE `party` (
    `session_number` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`session_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id_item` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `item_name_key`(`name`),
    UNIQUE INDEX `item_image_url_key`(`image_url`),
    PRIMARY KEY (`id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `progression` (
    `id_progression` INTEGER NOT NULL AUTO_INCREMENT,
    `introduction_is_viewed` BOOLEAN NOT NULL,
    `postit_is_viewed` BOOLEAN NOT NULL,
    `diary_is_viewed` BOOLEAN NOT NULL,
    `library_is_open` BOOLEAN NOT NULL,
    `gordon_is_viewed` BOOLEAN NOT NULL,
    `session_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `progression_session_number_key`(`session_number`),
    PRIMARY KEY (`id_progression`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `session_number` VARCHAR(191) NOT NULL,
    `id_item` INTEGER NOT NULL,

    PRIMARY KEY (`session_number`, `id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `progression` ADD CONSTRAINT `progression_session_number_fkey` FOREIGN KEY (`session_number`) REFERENCES `party`(`session_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_session_number_fkey` FOREIGN KEY (`session_number`) REFERENCES `party`(`session_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_id_item_fkey` FOREIGN KEY (`id_item`) REFERENCES `item`(`id_item`) ON DELETE RESTRICT ON UPDATE CASCADE;
