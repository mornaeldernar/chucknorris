import React, { useState, useEffect } from 'react';
import { getRandomJoke } from '../../services/axiosService';
import  { ThumbDown,ThumbUp } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';

const ChuckNorrisRandom = () => {

    const [chiste, setChiste] = useState(null);
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [actualizado, setActualizado] = useState(0);

    useEffect(() => {
        obtenerChiste()
    },[])
    
    const obtenerChiste = () => {
        getRandomJoke()
            .then((response) => {
                if(response.status === 200)
                {
                    
                    setActualizado(0)
                    setChiste(response.data)
                }
            })
            .catch()
    }
    const VoteLike = () => {
        if(actualizado === 0){
            setLike( like + 1);
        }else if(actualizado === -1) {
            setLike( like + 1);
            setDislike(dislike-1);
        }
        setActualizado(1)
    }
    const VoteDislike = () => {
        if(actualizado === 0){
            setDislike( dislike + 1);
        }else if(actualizado === 1) {
            setLike( like - 1);
            setDislike(dislike+1);
        }
        setActualizado(-1)
    }
    return (
        <Grid container 
        alignItems="center"
        justifyContent="center">
        <Card>
            <CardHeader title="Chuck Norris Joke">
                
            </CardHeader>
            <CardContent>
                { chiste != null ? 
                    (
                        <div className='container'>
                            <img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" style={{width:"150px", height:"100px"}}></img>
                            <p>{chiste.id}</p>
                            <p>{chiste.value}</p>
                        </div>
                    )
                    : 
                    null
                }
            </CardContent>
            <CardActions>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button onClick={VoteLike} startIcon={<ThumbUp />}>
                        {like}
                    </Button>
                    <Button onClick={VoteDislike} startIcon={<ThumbDown />}>
                        {dislike}
                    </Button>
                </Stack>
                <Button onClick={obtenerChiste} variant="outlined">Nuevo Chiste</Button>

            </CardActions>
        </Card>
        </Grid>
    );
}

export default ChuckNorrisRandom;
