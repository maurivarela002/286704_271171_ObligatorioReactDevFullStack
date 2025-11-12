// En src/layouts/WorkspaceLayout.jsx
import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from '../pages/Menu';
import Reserve from '../pages/Reserve/Reserve';
import StoragePage from '../pages/StorageUser/user';
import Statistics from '../pages/Statistics/Statistics';

const WorkspaceLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        p: 3,
        backgroundColor: 'background.default'
      }}
    >
      <Menu />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {/* First Row: Storage and Statistics */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3,
                  width: '100%'
                }}>
                  <Box sx={{ 
                    flex: { xs: '0 0 auto', md: '0 0 350px' },
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden'
                  }}>
                    <StoragePage />
                  </Box>
                  <Box sx={{ 
                    flex: '1 1 auto',
                    minWidth: 0,
                    width: '100%',
                    overflow: 'hidden'
                  }}>
                    <Statistics />
                  </Box>
                </Box>

                {/* Second Row: Reserve */}
                <Box>
                  <Reserve />
                </Box>

                {/* Third Row: Additional Space */}
                <Box sx={{ minHeight: '100px' }} />
              </>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default WorkspaceLayout;