-- MySQL Script generated by MySQL Workbench
-- 01/02/15 01:31:32
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mesi
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mesi` ;

-- -----------------------------------------------------
-- Schema mesi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mesi` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mesi` ;

-- -----------------------------------------------------
-- Table `mesi`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Users` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fingerPrint` VARCHAR(255) NOT NULL DEFAULT 'null',
  `phoneNumber` VARCHAR(20) NOT NULL DEFAULT 'null',
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`UsersType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`UsersType` ;

CREATE TABLE IF NOT EXISTS `mesi`.`UsersType` (
  `idUserType` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ItemsTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ItemsTypes` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ItemsTypes` (
  `idItemType` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idItemType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`CodeBars`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`CodeBars` ;

CREATE TABLE IF NOT EXISTS `mesi`.`CodeBars` (
  `idCodeBar` INT NOT NULL AUTO_INCREMENT,
  `codeBar` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idCodeBar`),
  UNIQUE INDEX `codeBar_UNIQUE` (`codeBar` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Items` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Items` (
  `idItem` INT NOT NULL AUTO_INCREMENT,
  `idItemType` INT NOT NULL,
  `idCodeBar` INT NOT NULL,
  `available` TINYINT(1) NOT NULL DEFAULT 0,
  `amount` INT NOT NULL DEFAULT 0,
  `minLevel` INT NOT NULL DEFAULT 20,
  `wholeSale` DOUBLE NOT NULL DEFAULT 0,
  `retailPrice` DOUBLE NOT NULL DEFAULT 0,
  `specialOffer` TINYINT(1) NOT NULL DEFAULT 0,
  `promotionAmount` INT NOT NULL DEFAULT 0,
  `baseMaterial` TEXT(5000) NULL,
  `country` VARCHAR(45) NOT NULL DEFAULT '\"México\"',
  `iType` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idItem`),
  INDEX `fk_Items_ItemsTypes1_idx` (`idItemType` ASC),
  INDEX `fk_Items_CodeBars1_idx` (`idCodeBar` ASC),
  CONSTRAINT `fk_Items_ItemsTypes1`
    FOREIGN KEY (`idItemType`)
    REFERENCES `mesi`.`ItemsTypes` (`idItemType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Items_CodeBars1`
    FOREIGN KEY (`idCodeBar`)
    REFERENCES `mesi`.`CodeBars` (`idCodeBar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Sales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Sales` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Sales` (
  `idSale` INT NOT NULL AUTO_INCREMENT,
  `idCodeBar` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
  `articles` TEXT(5000) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`idSale`),
  INDEX `fk_Sales_CodeBars1_idx` (`idCodeBar` ASC),
  CONSTRAINT `fk_Sales_CodeBars1`
    FOREIGN KEY (`idCodeBar`)
    REFERENCES `mesi`.`CodeBars` (`idCodeBar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Users_has_UsersType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Users_has_UsersType` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Users_has_UsersType` (
  `idUser` INT NOT NULL,
  `idUserType` INT NOT NULL,
  PRIMARY KEY (`idUser`, `idUserType`),
  INDEX `fk_Users_has_UsersType_UsersType1_idx` (`idUserType` ASC),
  INDEX `fk_Users_has_UsersType_Users1_idx` (`idUser` ASC),
  CONSTRAINT `fk_Users_has_UsersType_Users1`
    FOREIGN KEY (`idUser`)
    REFERENCES `mesi`.`Users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_UsersType_UsersType1`
    FOREIGN KEY (`idUserType`)
    REFERENCES `mesi`.`UsersType` (`idUserType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Providers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Providers` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Providers` (
  `idProvider` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `direction` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idProvider`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Registers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Registers` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Registers` (
  `idRegister` INT NOT NULL AUTO_INCREMENT,
  `idItem` INT NOT NULL,
  `idProvider` INT NOT NULL,
  `registerDate` DATETIME NOT NULL,
  `amount` INT NOT NULL DEFAULT 0,
  `paidCost` INT NOT NULL,
  `totalAmount` INT NOT NULL,
  PRIMARY KEY (`idRegister`),
  INDEX `fk_Registers_Items1_idx` (`idItem` ASC),
  INDEX `fk_Registers_Providers1_idx` (`idProvider` ASC),
  CONSTRAINT `fk_Registers_Articles1`
    FOREIGN KEY (`idItem`)
    REFERENCES `mesi`.`Items` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Registers_Providers1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `mesi`.`Providers` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`BranchOffices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`BranchOffices` ;

CREATE TABLE IF NOT EXISTS `mesi`.`BranchOffices` (
  `idBranchOffice` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `direction` VARCHAR(255) NOT NULL,
  `manager` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idBranchOffice`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`BranchOfficesRegisters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`BranchOfficesRegisters` ;

CREATE TABLE IF NOT EXISTS `mesi`.`BranchOfficesRegisters` (
  `idBranchOfficeRegisters` INT NOT NULL AUTO_INCREMENT,
  `idBranchOffice` INT NOT NULL,
  `idItem` INT NOT NULL,
  `dateWarehouseOut` DATETIME NOT NULL,
  `dateWarehouseIn` DATETIME NOT NULL,
  PRIMARY KEY (`idBranchOfficeRegisters`),
  INDEX `fk_BranchOfficeRegisters_BranchOffices1_idx` (`idBranchOffice` ASC),
  INDEX `fk_BranchOfficeRegisters_Items1_idx` (`idItem` ASC),
  CONSTRAINT `fk_BranchOfficeRegisters_BranchOffices1`
    FOREIGN KEY (`idBranchOffice`)
    REFERENCES `mesi`.`BranchOffices` (`idBranchOffice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BranchOfficeRegisters_Items1`
    FOREIGN KEY (`idItem`)
    REFERENCES `mesi`.`Items` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`PhoneNumbers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`PhoneNumbers` ;

CREATE TABLE IF NOT EXISTS `mesi`.`PhoneNumbers` (
  `idPhoneNumber` INT NOT NULL AUTO_INCREMENT,
  `numbers` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idPhoneNumber`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`BranchOfficesPhoneNumbers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`BranchOfficesPhoneNumbers` ;

CREATE TABLE IF NOT EXISTS `mesi`.`BranchOfficesPhoneNumbers` (
  `idBranchOffice` INT NOT NULL,
  `idPhoneNumber` INT NOT NULL,
  PRIMARY KEY (`idBranchOffice`, `idPhoneNumber`),
  INDEX `fk_BranchOffices_has_PhoneNumbers_PhoneNumbers1_idx` (`idPhoneNumber` ASC),
  INDEX `fk_BranchOffices_has_PhoneNumbers_BranchOffices1_idx` (`idBranchOffice` ASC),
  CONSTRAINT `fk_BranchOffices_has_PhoneNumbers_BranchOffices1`
    FOREIGN KEY (`idBranchOffice`)
    REFERENCES `mesi`.`BranchOffices` (`idBranchOffice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BranchOffices_has_PhoneNumbers_PhoneNumbers1`
    FOREIGN KEY (`idPhoneNumber`)
    REFERENCES `mesi`.`PhoneNumbers` (`idPhoneNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ProvidersPhoneNumbers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ProvidersPhoneNumbers` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ProvidersPhoneNumbers` (
  `idProvider` INT NOT NULL,
  `idPhoneNumber` INT NOT NULL,
  PRIMARY KEY (`idProvider`, `idPhoneNumber`),
  INDEX `fk_Provider_has_PhoneNumbers_PhoneNumbers1_idx` (`idPhoneNumber` ASC),
  INDEX `fk_Provider_has_PhoneNumbers_Provider1_idx` (`idProvider` ASC),
  CONSTRAINT `fk_Provider_has_PhoneNumbers_Provider1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `mesi`.`Providers` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Provider_has_PhoneNumbers_PhoneNumbers1`
    FOREIGN KEY (`idPhoneNumber`)
    REFERENCES `mesi`.`PhoneNumbers` (`idPhoneNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ItemsInBranchOffices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ItemsInBranchOffices` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ItemsInBranchOffices` (
  `idItem` INT NOT NULL,
  `idBranchOffice` INT NOT NULL,
  `amount` INT NOT NULL,
  INDEX `fk_ItemsInBranchOffice_Items1_idx` (`idItem` ASC),
  INDEX `fk_ItemsInBranchOffice_BranchOffices1_idx` (`idBranchOffice` ASC),
  PRIMARY KEY (`idItem`, `idBranchOffice`),
  CONSTRAINT `fk_ItemsInBranchOffice_Items1`
    FOREIGN KEY (`idItem`)
    REFERENCES `mesi`.`Items` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ItemsInBranchOffice_BranchOffices1`
    FOREIGN KEY (`idBranchOffice`)
    REFERENCES `mesi`.`BranchOffices` (`idBranchOffice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`CountOfSales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`CountOfSales` ;

CREATE TABLE IF NOT EXISTS `mesi`.`CountOfSales` (
  `idCountOfSale` INT NOT NULL AUTO_INCREMENT,
  `idCodeBar` INT NOT NULL,
  `amount` INT NOT NULL,
  `countOfSales` INT NOT NULL,
  PRIMARY KEY (`idCountOfSale`),
  INDEX `fk_CountOfSales_CodeBars1_idx` (`idCodeBar` ASC),
  CONSTRAINT `fk_CountOfSales_CodeBars1`
    FOREIGN KEY (`idCodeBar`)
    REFERENCES `mesi`.`CodeBars` (`idCodeBar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ProviderTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ProviderTypes` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ProviderTypes` (
  `idProviderType` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idProviderType`),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ProviderTypesProviders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ProviderTypesProviders` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ProviderTypesProviders` (
  `idProviderType` INT NOT NULL,
  `idProvider` INT NOT NULL,
  PRIMARY KEY (`idProviderType`, `idProvider`),
  INDEX `fk_ProviderTypes_has_Providers_Providers1_idx` (`idProvider` ASC),
  INDEX `fk_ProviderTypes_has_Providers_ProviderTypes1_idx` (`idProviderType` ASC),
  CONSTRAINT `fk_ProviderTypes_has_Providers_ProviderTypes1`
    FOREIGN KEY (`idProviderType`)
    REFERENCES `mesi`.`ProviderTypes` (`idProviderType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProviderTypes_has_Providers_Providers1`
    FOREIGN KEY (`idProvider`)
    REFERENCES `mesi`.`Providers` (`idProvider`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`Materials`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`Materials` ;

CREATE TABLE IF NOT EXISTS `mesi`.`Materials` (
  `idMaterial` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idMaterial`),
  UNIQUE INDEX `description_UNIQUE` (`description` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mesi`.`ItemsMaterials`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mesi`.`ItemsMaterials` ;

CREATE TABLE IF NOT EXISTS `mesi`.`ItemsMaterials` (
  `idItem` INT NOT NULL,
  `idMaterial` INT NOT NULL,
  PRIMARY KEY (`idItem`, `idMaterial`),
  INDEX `fk_Items_has_Materials_Materials1_idx` (`idMaterial` ASC),
  INDEX `fk_Items_has_Materials_Items1_idx` (`idItem` ASC),
  CONSTRAINT `fk_Items_has_Materials_Items1`
    FOREIGN KEY (`idItem`)
    REFERENCES `mesi`.`Items` (`idItem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Items_has_Materials_Materials1`
    FOREIGN KEY (`idMaterial`)
    REFERENCES `mesi`.`Materials` (`idMaterial`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;