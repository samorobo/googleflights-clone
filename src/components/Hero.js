import HeroImage from '../assets/images/heroImage.svg';
import Box from '@mui/material/Box';

export default function Hero(){
    return(
    <Box sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
            component="img"
            src={HeroImage}
            alt="Hero Image"
            sx={{
                marginTop: 8,
                height: '100%',
                width: 'auto',
            }}
        />
    </Box>
    )
}