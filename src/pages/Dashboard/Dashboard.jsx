import { Box, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UserRolesEnum } from 'src/app/enums/roleList';
import Diagram from 'src/components/diagram/Diagram';
import usePermission from 'src/hooks/usePermission';
import PopUp from './PopUp';
import { useState } from 'react';
import { dashboardInfo } from './DasboardInfo';
import DiagramHeader from 'src/components/diagram/DiagramHeader';
import { useGetStudentActiveInternshipQuery } from 'src/store/services/dashboard/dashboardApiSlice';
import CustomCircularProgress from 'src/components/loader/CustomCircularProgress';

function Dashboard() {
  const dispatch = useDispatch();
  const checkPermission = usePermission();

  const isAdvancedComission = checkPermission(UserRolesEnum.COMISSION.id);
  const isAdvancedAdmin = checkPermission(UserRolesEnum.ADMIN.id);

  const { data, isLoading } = useGetStudentActiveInternshipQuery({}, { skip: isAdvancedComission });

  return (
    <div>
      <Typography variant="h2">Bursa Uludağ Üniversitesi Bilgisayar Mühendisliği Staj Otomasyonu</Typography>
      <Paper
        sx={{
          display: 'flex',
          padding: '1rem',
          marginBottom: '1rem',
          marginTop: '1rem',
          overflowX: 'auto',
          gap: '1rem',
        }}
      >
        <Box className="flex flex-col">
          <Typography className="text-lg	"> Bilgilendirme Yazısı: </Typography>
          <Box className="flex flex-col">
            {dashboardInfo.map((item, index) => (
              <Typography className={`${item.red ? 'text-red-500' : ''} p-2`}>
                {' '}
                {index + 1} - {item.text}{' '}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>

      <Box className="flex flex-col sm:flex-row gap-4 ">
        <Paper sx={{ flex: 1, padding: '1rem' }}>
          {isLoading ? (
            <CustomCircularProgress />
          ) : (
            <>
              {!isAdvancedComission && <DiagramHeader data={data?.data} />}
              <Diagram data={data?.data} isAdvancedComission={isAdvancedComission} />
            </>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default Dashboard;
