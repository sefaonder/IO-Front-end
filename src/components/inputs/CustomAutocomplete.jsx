import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { List, ListItem, ListItemButton, ListItemText, Tooltip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { InternStatusEnum } from 'src/app/enums/internStatus';

const CustomAutocomplete = ({
  value,
  sx,
  field,
  onChange,
  label,
  useACSlice,
  error,
  helperText,
  disabled,
  required,
  filterId,
  disabledTooltipText,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { data: data, isLoading, isSucces } = useACSlice();
  const theme = useTheme();
  const { t } = useTranslation();

  function ACLabelFunction(value) {
    return value?.label ? `${value.label}` : '';
  }

  function findLabelValueinId(value, acData) {
    const record = acData.filter((item) => {
      if (item?.id === value?.id) {
        return item;
      }
    });
    return ACLabelFunction(record[0]);
  }

  useEffect(() => {
    if (data?.data) {
      setInputValue(findLabelValueinId(value, data.data));
    }
  }, [value, data]);

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) => {
      const searchText = value?.id ? '' : inputValue.toLowerCase();
      const { label, subtext, id, translate } = option;
      if (Boolean(filterId) && id !== filterId) {
        return false;
      }
      return (
        label.toLowerCase().includes(searchText) ||
        subtext.toLowerCase().includes(searchText) ||
        t(translate).toLowerCase().includes(searchText)
      );
    });
  };

  return (
    <Autocomplete
      sx={sx}
      disabled={disabled}
      aria-required={required}
      options={data?.data || []}
      loading={isLoading}
      getOptionDisabled={(option) => {
        return Boolean(option.disabled);
      }}
      freeSolo
      renderOption={(props, option) => (
        <Tooltip
          key={option.id}
          title={Boolean(props['aria-disabled']) && Boolean(disabledTooltipText) ? disabledTooltipText : null}
        >
          <List key={option.id} sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton key={option.id} {...props} style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <ListItemText
                primary={option?.label}
                secondary={
                  option.translate
                    ? `${option?.subtext} -> ${InternStatusEnum[option?.translate].label}`
                    : option?.subtext
                }
              />
            </ListItemButton>
          </List>
        </Tooltip>
      )}
      getOptionLabel={(option) => ACLabelFunction(option)}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={filterOptions}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        console.log('newInputValue', newInputValue);
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
