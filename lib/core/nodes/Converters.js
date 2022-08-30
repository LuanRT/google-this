'use strict';

const Constants = require('../../utils/constants');

class Converters {
  constructor($) {
    const unit_converter_input = $(Constants.SELECTORS.UNIT_CONVERTER_INPUT).attr('value');
    const unit_converter_output = $(Constants.SELECTORS.UNIT_CONVERTER_OUTPUT).attr('value');
    const unit_converter_formula = $(Constants.SELECTORS.UNIT_CONVERTER_FORMULA).text();

    const input_currency_name = $(Constants.SELECTORS.INPUT_CURRENCY_NAME).attr('data-name');
    const output_currency_name = $(Constants.SELECTORS.OUTPUT_CURRENCY_NAME).attr('data-name');
    const currency_converter_input = $(Constants.SELECTORS.CURRENCY_CONVERTER_INPUT).text();
    const currency_converter_output = $(Constants.SELECTORS.CURRENCY_CONVERTER_OUTPUT).text();

    if (unit_converter_input && unit_converter_output) {
      this.input = unit_converter_input;
      this.output = unit_converter_output;
      this.formula = unit_converter_formula;
    } else if (currency_converter_input && currency_converter_output) {
      this.input = {
        name: input_currency_name,
        value: currency_converter_input
      }
      
      this.output = {
        name: output_currency_name,
        value: currency_converter_output
      }
    }
  }
}

module.exports = Converters;