import { AutoStoriesOutlined, ChevronLeft, ChevronRight, QuizOutlined } from '@mui/icons-material'
import { Box, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import { routes } from '@/apps/routes'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 240

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const LeftNavigation = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Drawer className={classes.RootLeftNavigation} variant="permanent" open={open}>
      <Toolbar sx={{ paddingLeft: '10px !important' }}>
        <IconButton onClick={toggleDrawer}>{open ? <ChevronLeft /> : <ChevronRight />}</IconButton>
        {open && <Box>Menu</Box>}
      </Toolbar>
      <Divider />
      <List component="nav">
        {routes.map(route => (
          <ListItemButton
            key={route.id}
            selected={location.pathname === route.rootPath}
            onClick={() => navigate(route.rootPath)}
          >
            <ListItemIcon>{<route.Icon />}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  RootLeftNavigation: {
    '& .Mui-selected': {
      '& *': {
        color: '#333333 !important',
        fontWeight: 700,
      },
    },
  },
}))

export default LeftNavigation
