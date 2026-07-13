// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, CircularProgress, Box,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { fetchPrice } from '../services/stockPrice';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [invested, setInvested] = useState(0);
  const [netWorth, setNetWorth] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      // Expenses
      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id);
      const totalExpenses = (expenses ?? []).reduce((s, e) => s + Number(e.amount), 0);

      // Income
      const { data: incomes } = await supabase
        .from('income')
        .select('amount')
        .eq('user_id', user.id);
      const totalIncome = (incomes ?? []).reduce((s, i) => s + Number(i.amount), 0);

      // Holdings
      const { data: holdings } = await supabase
        .from('holdings')
        .select('*')
        .eq('user_id', user.id);

      let investedTotal = 0;
      let marketTotal = 0;
      for (const h of holdings ?? []) {
        investedTotal += Number(h.shares) * Number(h.bought_at);
        try {
          const price = await fetchPrice(h.symbol);
          marketTotal += Number(h.shares) * price;
        } catch {
          marketTotal += Number(h.shares) * Number(h.bought_at);
        }
      }

      const bal = totalIncome - totalExpenses;
      setBalance(bal);
      setInvested(investedTotal);
      setNetWorth(bal + marketTotal);
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const cards = [
    { label: 'Main Balance', value: balance },
    { label: 'Invested Amount', value: invested },
    { label: 'Net Worth', value: netWorth },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {cards.map((c) => (
          <Paper key={c.label} sx={{ p: 3 }}>
            <Typography color="text.secondary">{c.label}</Typography>
            <Typography variant="h4">${c.value.toFixed(2)}</Typography>
          </Paper>
        ))}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Use the menu above to add expenses, income, or manage your investments.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
