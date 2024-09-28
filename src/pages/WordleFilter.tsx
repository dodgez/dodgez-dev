import useWordDefinition from '@/hooks/useWordDefinition';
import ClearIcon from '@mui/icons-material/Close';
import Button from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const MAX_DEFAULT = '10';

export default function WordleFilter() {
  const [isLoading, setLoading] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    void fetch(import.meta.env.VITE_API_URL as string, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY as string,
      },
    })
      .then((res) => res.json())
      .then((words: string[]) => {
        setWords(words.sort().map((word: string) => word.toLowerCase()));
        setLoading(false);
      });
  }, []);

  const [filter, setFilter] = useState('');
  const [submitFilter, setSubmitFilter] = useState<string | undefined>(
    undefined,
  );
  const onFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setFilter(target.value.toLowerCase());
      setSubmitFilter(undefined);
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

  const fetchDefinition = useCallback(() => {
    setSubmitFilter(filter);
  }, [filter]);

  const {
    data: wordDefinition,
    isError,
    isFetching: isDefinitionLoading,
    refetch,
  } = useWordDefinition(submitFilter);

  return (
    <Box p={2} textAlign="center">
      <Container maxWidth="sm">
        <Typography>
          Type a word to check if it has been used as a Wordle answer before
        </Typography>
        <TextField
          fullWidth
          InputProps={{
            endAdornment:
              filter !== '' ? (
                <IconButton
                  onClick={() => {
                    setFilter('');
                    setSubmitFilter(undefined);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ) : null,
          }}
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
              <Grid
                key={word}
                size={{
                  md: 3,
                  sm: 4,
                  xs: 6,
                }}
              >
                <Item>
                  <Typography>{word}</Typography>
                </Item>
              </Grid>
            ))}
          </Grid>
          <Box>
            <ToggleButtonGroup
              exclusive
              onChange={(_, newFilteredWordsLength: string) => {
                setFilteredWordsLength(newFilteredWordsLength);
              }}
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
            <Typography marginTop={2}>No definition found.</Typography>
          ) : isError ? (
            <>
              <Typography marginTop={2}>
                An unexpected error occurred.
              </Typography>
              <Button onClick={() => void refetch()} sx={{ marginTop: 2 }}>
                Retry
              </Button>
            </>
          ) : (
            <Typography marginTop={2}>
              First meaning found:{' '}
              <Typography component="em">{wordDefinition}</Typography>
            </Typography>
          )}
        </Container>
      )}
    </Box>
  );
}
