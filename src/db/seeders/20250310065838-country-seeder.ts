'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import { TableNames } from "src/i18n";
import * as path from 'node:path';
import * as fs from 'node:fs';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, _: Sequelize) {
    const countryPath = path.resolve(__dirname, '../../../', 'json/countries.json');
    const records = JSON.parse(fs.readFileSync(countryPath, { encoding: 'utf-8' }).toString());

    Array.from(records).forEach((item: unknown) => {
      if (typeof item === 'object') {
        delete item["emoji"];

        item["createdAt"] = new Date();
        item["updatedAt"] = new Date();
      }
    });
    await queryInterface.bulkInsert(TableNames.COUNTRY, records);
  },

  async down(queryInterface: QueryInterface, _: Sequelize) {
    await queryInterface.bulkDelete(TableNames.COUNTRY, null, {});
  }
};
