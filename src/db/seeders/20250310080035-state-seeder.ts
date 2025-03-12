'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import * as path from 'node:path';
import * as fs from 'node:fs';
import { TableNames } from "src/i18n";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, _: Sequelize) {
    const countryPath = path.resolve(__dirname, '../../../', 'json/states.json');
    const records = JSON.parse(fs.readFileSync(countryPath, { encoding: 'utf-8' }).toString());

    Array.from(records).forEach((item: unknown) => {
      if (typeof item === 'object') {
        delete item["country_code"];
        delete item["country_name"];
        delete item["type"];
        delete item["id"];


        item["createdAt"] = new Date();
        item["updatedAt"] = new Date();
      }
    });
    await queryInterface.bulkInsert(TableNames.STATES, records);
  },

  async down(queryInterface: QueryInterface, _: Sequelize) {
    await queryInterface.bulkDelete(TableNames.STATES, null, {});
  }
};
