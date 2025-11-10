// En src/layouts/WorkspaceLayout.jsx
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Menu from '../pages/Menu';
import Reserve from '../pages/Reserve/Reserve';

const WorkspaceLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 64px)',
        marginTop: '64px'
      }}
    >
      <Menu/>
      <Routes>
        <Route path="/" element={<Reserve />} />
      </Routes>
    </Box>
  );
};

export default WorkspaceLayout;