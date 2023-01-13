import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import {integer, required} from "vee-validate/dist/rules";

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})
extend('integer', {
  ...integer,
  message: '{_field_} needs to be digits.',
})

Object.keys(rules).forEach(rule => {
  extend(rule, {
    // eslint-disable-next-line import/namespace
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});
