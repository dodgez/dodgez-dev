import AboutBlurb from '@/components/AboutBlurb';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import ProfileBlurb from '@/components/ProfileBlurb';
import Tech from '@/components/Tech';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Head from 'next/head';
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

export default function Home() {
  const [isTabbedView, setTabbedView] = useState(false);
  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setTabbedView(event.target.checked),
    [],
  );

  const [tabValue, setTabValue] = useState('Experience');
  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: string) => setTabValue(newValue),
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
            <Typography variant="h4">{tab.label}</Typography>
            <tab.content />
          </Stack>
        )),
    [tabs],
  );

  return (
    <>
      <Head>
        <title>Dodgez Dev</title>
      </Head>
      <Box p={8}>
        <Stack spacing={8}>
          <ProfileBlurb />
          <AboutBlurb />
          <Stack spacing={1}>
            <Box display="inline">
              <FormControlLabel
                control={
                  <Switch
                    checked={isTabbedView}
                    onChange={handleViewChange}
                    name="tab-view"
                  />
                }
                label="Tabbed view"
              />
            </Box>
            {!isTabbedView ? (
              <Stack pt={6} spacing={8}>
                {flatTabs}
              </Stack>
            ) : (
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    aria-label="About sections"
                    onChange={handleTabChange}
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.label}
                        label={tab.label}
                        value={tab.label}
                      />
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
    </>
  );
}
