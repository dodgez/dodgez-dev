import Box from '@mui/material/Box';
import Button from '@mui/lab/LoadingButton';
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
  const [wordDefinition, setWordDefinition] = useState<
    string | null | undefined
  >(undefined);
  const onFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFilter(target.value);
      setWordDefinition(undefined);
    },
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

  const [isDefinitionLoading, setDefinitionLoading] = useState(false);
  const fetchDefinition = useCallback(() => {
    setDefinitionLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${filter}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.resolve(null);
        }
        return res.json();
      })
      .then((definitions) => {
        if (!definitions || definitions.length === 0) {
          setWordDefinition(null);
        } else {
          setWordDefinition(
            definitions[0].meanings[0].definitions[0].definition,
          );
        }
        setDefinitionLoading(false);
      })
      .catch(() => {
        setWordDefinition(null);
        setDefinitionLoading(false);
      });
  }, [filter]);

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
            {wordDefinition === undefined || isDefinitionLoading ? (
              <Button
                disabled={isDefinitionLoading}
                loading={isDefinitionLoading}
                onClick={fetchDefinition}
                variant="contained"
              >{`Fetch meaning of ${filter}`}</Button>
            ) : wordDefinition === null ? (
              <Typography marginTop={2}>
                No definition found or an error occurred.
              </Typography>
            ) : (
              <Typography marginTop={2}>
                The first meaning found:{' '}
                <Typography component="em">{wordDefinition}</Typography>
              </Typography>
            )}
          </Container>
        )}
      </Box>
    </>
  );
}
