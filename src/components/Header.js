import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GoogleLogo from '../assets/icons/GoogleLogo.webp';

export default function Header() {
  return (
    <Box
      sx={{
        height: {xs:'4rem', sm:"4.5rem"},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        bgcolor: 'white',
        width: '100%',
        padding: '0 1rem',
        position: 'fixed',
        top: 0,
        zIndex: 1000 }}
    >
      <Box>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>
      <a
      href="https://www.google.com"
      target="_blank"
      style={{ textDecoration: 'none' }}
      >
        <Box
        component="img"
        src={GoogleLogo}
        alt="Google Logo"
        sx={{
          height: '1.5rem',
          width: 'auto',
          marginLeft: 2,
          marginRight: 4
        }}
      />
      </a>
      </Box>
  );
}