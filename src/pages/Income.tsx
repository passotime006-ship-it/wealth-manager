import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Income = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Gain
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Track your income / pocket money here
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default Income;