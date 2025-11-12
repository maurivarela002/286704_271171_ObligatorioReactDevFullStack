import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Paper, Typography, Grid } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Statistics = () => {
  const theme = useTheme();
  const { t } = useTranslation('statistics');
  const { listaReservas, listaEspecialidades, listaClinicas, listaOdontologos } = useSelector(state => state.global);

  const getSpecialtyData = () => {
    if (!listaReservas?.length || !listaEspecialidades?.length) return null;

    const specialtyCount = {};
    
    listaReservas.forEach(reserva => {
      const specialty = reserva.especialidad;
      specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });

    const labels = Object.keys(specialtyCount);
    const data = Object.values(specialtyCount);

    return {
      labels,
      datasets: [
        {
          label: t('charts.specialty'),
          data,
          backgroundColor: theme.palette.primary.light + '80',
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
      ],
    };
  };

  const getClinicData = () => {
    if (!listaReservas?.length || !listaClinicas?.length) return null;

    const clinicCount = {};
    
    listaReservas.forEach(reserva => {
      const clinic = reserva.clinica;
      clinicCount[clinic] = (clinicCount[clinic] || 0) + 1;
    });

    const labels = Object.keys(clinicCount);
    const data = Object.values(clinicCount);

    return {
      labels,
      datasets: [
        {
          label: t('charts.clinic'),
          data,
          backgroundColor: theme.palette.secondary.light + '80',
          borderColor: theme.palette.secondary.main,
          borderWidth: 1,
        },
      ],
    };
  };

  const getDentistData = () => {
    if (!listaReservas?.length || !listaOdontologos?.length) return null;

    const dentistCount = {};
    
    listaReservas.forEach(reserva => {
      const dentist = reserva.odontologo;
      dentistCount[dentist] = (dentistCount[dentist] || 0) + 1;
    });

    const labels = Object.keys(dentistCount);
    const data = Object.values(dentistCount);

    return {
      labels,
      datasets: [
        {
          label: t('charts.dentist'),
          data,
          backgroundColor: theme.palette.info.light + '80',
          borderColor: theme.palette.info.main,
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('charts.reservationsTitle'),
        color: theme.palette.text.primary,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxShadow: theme.shadows[3],
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      },
      datalabels: {
        display: true,
        color: theme.palette.text.primary,
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: theme.palette.divider,
          drawBorder: false
        },
        ticks: {
          color: theme.palette.text.secondary,
          stepSize: 1,
          precision: 0
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: theme.palette.text.primary,
          font: {
            weight: '500'
          }
        }
      }
    },
    barPercentage: 0.6,
    categoryPercentage: 0.8,
    animation: {
      duration: 1000
    }
  };

  const getChartData = (data, label, color) => {
    if (!data) return null;
    
    return {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        label: label,
        backgroundColor: theme.palette[color].light + '80',
        borderColor: theme.palette[color].main,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }))
    };
  };

  const specialtyData = getChartData(getSpecialtyData(), t('charts.specialty'), 'primary');
  const clinicData = getChartData(getClinicData(), t('charts.clinic'), 'secondary');
  const dentistData = getChartData(getDentistData(), t('charts.dentist'), 'info');

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        {t('title')}
      </Typography>
      
      {!specialtyData && !clinicData && !dentistData ? (
        <Typography variant="body1" color="text.secondary">
          {t('noData')}
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
          {specialtyData && (
            <Grid item xs={12} md={4} sx={{ p: 0, m: 0, display: 'flex' }}>
              <Paper sx={{ 
                p: 2, 
                backgroundColor: 'background.paper',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%',
                maxWidth: '100%',
                m: 0
              }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {t('charts.specialty')}
                </Typography>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <Bar 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: ''
                        }
                      }
                    }} 
                    data={specialtyData} 
                  />
                </Box>
              </Paper>
            </Grid>
          )}
          
          {clinicData && (
            <Grid item xs={12} md={4} sx={{ p: 0, m: 0, display: 'flex' }}>
              <Paper sx={{ 
                p: 2, 
                backgroundColor: 'background.paper',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%',
                maxWidth: '100%',
                m: 0
              }}>
                <Typography variant="h6" color="secondary" gutterBottom>
                  {t('charts.clinic')}
                </Typography>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <Bar 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: ''
                        }
                      }
                    }} 
                    data={clinicData} 
                  />
                </Box>
              </Paper>
            </Grid>
          )}
          
          {dentistData && (
            <Grid item xs={12} md={4} sx={{ p: 0, m: 0, display: 'flex' }}>
              <Paper sx={{ 
                p: 2, 
                backgroundColor: 'background.paper',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100%',
                maxWidth: '100%',
                m: 0
              }}>
                <Typography variant="h6" color="info.main" gutterBottom>
                  {t('charts.dentist')}
                </Typography>
                <Box sx={{ flexGrow: 1, position: 'relative' }}>
                  <Bar 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: ''
                        }
                      }
                    }} 
                    data={dentistData} 
                  />
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Statistics;
