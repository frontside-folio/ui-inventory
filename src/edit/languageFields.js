import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { Select } from '@folio/stripes/components';

import RepeatableField from '../components/RepeatableField';
import languages from '../data/languages';

const renderLanguageField = ({ field, fieldIndex }) => {
  const languageOptions = languages.selectOptions(field);
  const label = fieldIndex === 0
    ? (
      <FormattedMessage id="ui-inventory.language">
        {message => message + ' *'}
      </FormattedMessage>
    )
    : null;

  return (
    <FormattedMessage id="ui-inventory.selectLanguage">
      {placeholder => (
        <Field
          label={label}
          name={field}
          component={Select}
          placeholder={placeholder}
          dataOptions={languageOptions}
        />
      )}
    </FormattedMessage>
  );
};

renderLanguageField.propTypes = {
  field: PropTypes.object,
  fieldIndex: PropTypes.number,
};

const LanguageFields = () => (
  <RepeatableField
    name="languages"
    label={<FormattedMessage id="ui-inventory.languages" />}
    addLabel={<FormattedMessage id="ui-inventory.addLanguage" />}
    addButtonId="clickable-add-language"
    template={[{
      render(fieldObj) { return renderLanguageField(fieldObj); },
    }]}
  />
);


export default LanguageFields;
