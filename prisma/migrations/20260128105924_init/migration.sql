-- CreateTable
CREATE TABLE `Party` (
    `session_number` INTEGER NOT NULL,
    `id_location` VARCHAR(120) NULL,

    PRIMARY KEY (`session_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id_item` INTEGER NOT NULL,

    PRIMARY KEY (`id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progression` (
    `id_progression` INTEGER NOT NULL AUTO_INCREMENT,
    `introduction_is_viewed` BOOLEAN NOT NULL,
    `postit_is_viewed` BOOLEAN NOT NULL,
    `diary_is_viewed` BOOLEAN NOT NULL,
    `library_is_open` BOOLEAN NOT NULL,
    `session_number` INTEGER NOT NULL,

    UNIQUE INDEX `Progression_session_number_key`(`session_number`),
    PRIMARY KEY (`id_progression`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventory` (
    `session_number` INTEGER NOT NULL,
    `id_item` INTEGER NOT NULL,

    PRIMARY KEY (`session_number`, `id_item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Progression` ADD CONSTRAINT `Progression_session_number_fkey` FOREIGN KEY (`session_number`) REFERENCES `Party`(`session_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_session_number_fkey` FOREIGN KEY (`session_number`) REFERENCES `Party`(`session_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_id_item_fkey` FOREIGN KEY (`id_item`) REFERENCES `Item`(`id_item`) ON DELETE RESTRICT ON UPDATE CASCADE;
