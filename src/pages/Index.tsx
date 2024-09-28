import AboutBlurb from '@/components/AboutBlurb';
import ClientPortal from '@/components/ClientPortal';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import ProfileBlurb from '@/components/ProfileBlurb';
import Tech from '@/components/Tech';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function Index() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [isTabbedView, setTabbedView] = useState(isSmall);
  useEffect(() => {
    if (isSmall) {
      setTabbedView(false);
    }
  }, [isSmall]);
  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTabbedView(event.target.checked);
    },
    [],
  );

  const [tabValue, setTabValue] = useState('Experience');
  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    },
    [],
  );

  const tabs = useMemo(
    () => [
      {
        content: Experience,
        flatOrder: 1,
        label: 'Experience',
      },
      {
        content: Education,
        flatOrder: 2,
        label: 'Education',
      },
      {
        content: Tech,
        flatOrder: 0,
        label: 'Tech',
      },
    ],
    [],
  );
  const flatTabs = useMemo(
    () =>
      [...tabs]
        .sort((tabA, tabB) => tabA.flatOrder - tabB.flatOrder)
        .map((tab) => (
          <Stack key={tab.label} spacing={2}>
            <Typography color="primary" variant="h4">
              {tab.label}
            </Typography>
            <tab.content />
          </Stack>
        )),
    [tabs],
  );

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <ProfileBlurb />
        <Divider />
        <AboutBlurb />
        <Divider />
        <Stack spacing={1}>
          <ClientPortal selector="#tab-toggle-portal">
            <Box
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: { display: 'none' },
                [theme.breakpoints.up('sm')]: { display: 'inline' },
              })}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isTabbedView}
                    color="info"
                    name="tab-view"
                    onChange={handleViewChange}
                  />
                }
                label="Tabbed view"
              />
            </Box>
          </ClientPortal>
          {!isTabbedView ? (
            <Stack divider={<Divider />} spacing={4}>
              {flatTabs}
            </Stack>
          ) : (
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList aria-label="About sections" onChange={handleTabChange}>
                  {tabs.map((tab) => (
                    <Tab key={tab.label} label={tab.label} value={tab.label} />
                  ))}
                </TabList>
              </Box>
              {tabs.map((tab) => (
                <TabPanel
                  key={tab.label}
                  sx={{ marginTop: '0px !important' }}
                  value={tab.label}
                >
                  <tab.content />
                </TabPanel>
              ))}
            </TabContext>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
