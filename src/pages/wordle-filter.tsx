import OpenInNew from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MAX_DEFAULT = '10';

export default function WordleFilter() {
  const [isLoading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL!, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
    })
      .then((res) => res.json())
      .then((words) => {
        setWords(words.sort());
        setLoading(false);
      });
  }, []);

  const [filter, setFilter] = useState('');
  const onFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => setFilter(target.value),
    [],
  );

  const [filteredWordsLength, setFilteredWordsLength] = useState(MAX_DEFAULT);

  const [filteredWords, filteredCount, total] = useMemo(() => {
    const filterLength =
      filteredWordsLength === 'all' ? 0 : Number(filteredWordsLength);
    const filteredWords = words.filter((word) => word.includes(filter));
    const slicedWords =
      filterLength > 0 ? filteredWords.slice(0, filterLength) : filteredWords;
    return [slicedWords, slicedWords.length, filteredWords.length];
  }, [filter, filteredWordsLength, words]);

  return (
    <>
      <Head>
        <title>Zachary&apos;s Wordle filter</title>
      </Head>
      <Box p={2} textAlign="center">
        <Container maxWidth="sm">
          <Typography>
            Type a word to check if it has been used as a Wordle answer before
          </Typography>
          <TextField
            fullWidth
            label="Filter"
            onChange={onFilterChange}
            placeholder="E.g. agent"
            sx={{ backgroundColor: 'white', marginTop: 2 }}
            value={filter}
            variant="outlined"
          />
        </Container>
        {isLoading ? (
          <CircularProgress sx={{ marginTop: 4 }} />
        ) : filteredCount > 0 ? (
          <Box>
            <Grid
              container
              justifyContent="center"
              margin="auto"
              marginTop={2}
              maxWidth="md"
              spacing={2}
            >
              {filteredWords.map((word) => (
                <Grid key={word} xs={6} sm={4} md={3}>
                  <Item>
                    <Typography>{word}</Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
            <Box>
              <ToggleButtonGroup
                exclusive
                onChange={(_, newFilteredWordsLength) =>
                  setFilteredWordsLength(newFilteredWordsLength)
                }
                sx={{ marginTop: 2 }}
                value={filteredWordsLength}
              >
                <ToggleButton
                  sx={{ backgroundColor: 'white', borderRightWidth: 2 }}
                  value="10"
                >
                  10
                </ToggleButton>
                <ToggleButton
                  sx={{ backgroundColor: 'white', borderRightWidth: 2 }}
                  value="20"
                >
                  20
                </ToggleButton>
                <ToggleButton
                  sx={{ backgroundColor: 'white', borderRightWidth: 2 }}
                  value="50"
                >
                  50
                </ToggleButton>
                <ToggleButton
                  sx={{ backgroundColor: 'white', borderRightWidth: 2 }}
                  value="100"
                >
                  100
                </ToggleButton>
                <ToggleButton sx={{ backgroundColor: 'white' }} value="all">
                  All
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography marginTop={2}>
                {filteredCount} out of {total} filtered words shown
              </Typography>
            </Box>
          </Box>
        ) : (
          <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Button
              endIcon={<OpenInNew />}
              href={`https://www.oed.com/search/dictionary/?scope=Entries&q=${filter}`}
              target="_blank"
            >{`Check Oxford Dictionary for ${filter}`}</Button>
          </Container>
        )}
      </Box>
    </>
  );
}
