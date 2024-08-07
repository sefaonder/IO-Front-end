import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import CustomActionList from 'src/components/data/CustomActionList';
import {
  useDeleteHolidayMutation,
  useGetHolidaysQuery,
} from 'src/store/services/internshipPanel/internshipPanelApiSlice';
import HolidayCreateDialog from './HolidayCreateDialog';
import dayjs from 'dayjs';
import { projectSnackbar } from 'src/app/handlers/ProjectSnackbar';

function HolidayList({ open }) {
  const { data, isLoading, refetch } = useGetHolidaysQuery({}, { skip: !open });

  const [deleteHoliday, { isLoading: isLoadingDelete }] = useDeleteHolidayMutation();

  const [dialog, setDialog] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await deleteHoliday(id);

      if (response.data) {
        projectSnackbar(response.data.message, { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
    refetch();
  };

  console.log('data', data);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setDialog(true)}>
        Tatil Ekle
      </Button>
      <Box>
        <CustomActionList
          listData={data?.data}
          loading={isLoading}
          onDelete={handleDelete}
          itemHandler={(item) => dayjs(item.date).format('DD.MM.YYYY') + ' - ' + item?.desc || ''}
        />
      </Box>
      <HolidayCreateDialog open={dialog} handleClose={() => setDialog(false)} onSucces={() => refetch()} />
    </Box>
  );
}

export default HolidayList;
