export const theme = {
  palette: {
    primary: {
      main: '#24292e'
    },
    secondary: {
      main: '#74797e'
    }
  }
}

export const homeStyles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: 'white',
    fontSize: '2rem',
    margin: '1rem'
  },
  subtitle: {
    color: '#d1d5da'
  },
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 2
  },
  splash: {
    zIndex: 20,
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    backgroundColor: 'rgba(50,50,50,0.1)'
  }
})

export const tableStyles = {
  root: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  table: {
    flex: 1
  },
  footer: {
    margin: '1em',
    height: '2em'
  },
  paper: {
    overflow: 'auto',
    boxShadow: 'none',
    border: '1px solid lightgray'
  },
  navigationButton: {
    margin: '0 1em'
  },
  row: {
    display: 'flex'
  },
  title: {
    flex: 4
  },
  location: {
    flex: 1
  },
  type: {
    flex: 1
  },
  created_at: {
    flex: 1
  },
  company: {
    flex: 1
  },
  pageNumber: {
    display: 'inline',
    fontWeight: 'bold'
  }
}

export const formStyles = {
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1em'
  },
  input: {
    margin: '1em'
  },
  button: {
    boxShadow: 'none'
  }
}

export const tableHeaderStyles = {
  clickable: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.5s ease-out'
    }
  },
  icon: {
    padding: 0
  },
  title: {
    verticalAlign: 'middle'
  },
  row: {
    display: 'flex'
  }
}