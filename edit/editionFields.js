import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@folio/stripes-components/lib/TextField';
import RepeatableField from '@folio/stripes-components/lib/RepeatableField';

const EditionFields = ({ formatMsg }) => (
  <RepeatableField
    name="editions"
    label={formatMsg({ id: 'ui-inventory.editions' })}
    addLabel={formatMsg({ id: 'ui-inventory.addEdition' })}
    addButtonId="clickable-add-edition"
    template={[{
      component: TextField,
    }]}
  />
);

EditionFields.propTypes = { formatMsg: PropTypes.func };
export default EditionFields;
