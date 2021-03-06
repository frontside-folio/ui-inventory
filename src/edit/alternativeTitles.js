import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  TextField,
  Select,
} from '@folio/stripes/components';

import RepeatableField from '../components/RepeatableField';

const AlternativeTitles = ({ alternativeTitleTypes }) => {
  const alternativeTitleTypeOptions = alternativeTitleTypes.map(
    it => ({
      label: it.name,
      value: it.id,
    }),
  );

  return (
    <FormattedMessage id="ui-inventory.selectAlternativeTitleType">
      {placeholder => (
        <RepeatableField
          name="alternativeTitles"
          label={<FormattedMessage id="ui-inventory.alternativeTitles" />}
          addLabel={<FormattedMessage id="ui-inventory.addAlternativeTitles" />}
          addButtonId="clickable-add-alternativeTitle"
          template={[
            {
              name: 'alternativeTitleTypeId',
              label: (
                <FormattedMessage id="ui-inventory.type">
                  {(message) => message + ' *'}
                </FormattedMessage>
              ),
              component: Select,
              placeholder,
              dataOptions: alternativeTitleTypeOptions,
              required: true,
            },
            {
              name: 'alternativeTitle',
              label: (
                <FormattedMessage id="ui-inventory.alternativeTitle">
                  {(message) => message + ' *'}
                </FormattedMessage>
              ),
              component: TextField,
              required: true,
            }
          ]}
          newItemTemplate={{ alternativeTitleTypeId: '', alternativeTitle: '' }}
        />
      )}
    </FormattedMessage>
  );
};

AlternativeTitles.propTypes = {
  alternativeTitleTypes: PropTypes.arrayOf(PropTypes.object),
};

export default AlternativeTitles;
