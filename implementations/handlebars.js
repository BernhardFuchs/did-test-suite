const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const dirContents = fs.readdirSync(__dirname);

const partials = dirContents.filter(
  contents => contents.match(/.*.hbs/ig));

partials.forEach(file => {
  const partial = fs.readFileSync(
    path.join(__dirname, file), 'utf8');
  Handlebars.registerPartial(file, partial);
});

Handlebars.registerHelper('getStatusMark', state => {
  let statusMark = '-';

  if(state === 'passed') {
    statusMark = '✓';
  }
  if(state === 'failed') {
    statusMark = '❌';
  }
  return statusMark;
});

Handlebars.registerHelper(
  'getOptional', optional => optional ? 'optional' : 'not-optional');

Handlebars.registerHelper(
  'getOptionalTitle',
  title => /optional/i.test(title) ? 'optional' : 'not-optional');

const template = Handlebars.template;
const templates = Handlebars.templates = Handlebars.templates || {};
//this code was autogenerated by handlebars
templates['report-template.hbs'] = template(
  {
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      let stack1;
      return '<!DOCTYPE html>\n<html>\n  <head>\n' +
    ((stack1 = container.invokePartial(
      partials['head.hbs'], depth0, {name: 'head.hbs', data, indent: '    ', helpers, partials, decorators: container.decorators})) != null ? stack1 : '') +
    '  </head>\n  <body>\n' +
    ((stack1 = container.invokePartial(
      partials['implementation.hbs'], depth0, {name: 'implementation.hbs', data, indent: '    ', helpers, partials, decorators: container.decorators})) != null ? stack1 : '') +
    ((stack1 = container.invokePartial(partials['report.hbs'], depth0, {name: 'report.hbs', data, indent: '    ', helpers, partials, decorators: container.decorators})) != null ? stack1 : '') +
    '  </body>\n</html>\n';
}, usePartial: true, useData: true});

module.exports = templates['report-template.hbs'];
