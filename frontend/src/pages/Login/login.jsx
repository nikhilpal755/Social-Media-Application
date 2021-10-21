import { useRef, useContext } from "react";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/authContext";
import { CircularProgress } from "@mui/material";
// import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { withStyles } from "@mui/styles"
import { useMediaQuery } from "@mui/material"


const theme = createTheme();
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "blue"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue"
      }
    }
  }
})(TextField);


export default function Login() {
  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const email = useRef();
  const password = useRef();


  const { isFetching, dispatch } = useContext(AuthContext);


  const handleSubmit = (e) => {
    e.preventDefault();
  


    LoginCall({ email: email.current.value, password: password.current.value }, dispatch);
  }
  return (
    <>
     <div className="loginContainer" style={{height:'100vh' , backgroundColor:'rgb(27, 25, 25)', color : 'white'}}>

      <Typography
        component="h1"
        variant="h3"
        style={{
          display: !mediaLessthanmd ? "" : "flex",
          paddingLeft: !mediaLessthanmd ? "10%" : "0%",
          paddingTop: !mediaLessthanmd ? "4%" : "0%",
          justifyContent : mediaLessthanmd && "center",
          textShadow: "3px 3px blue",
          cursor: "pointer"
        }}
      >
        Socionik
      </Typography>
      <ThemeProvider theme={theme}>
        <Container component="main" >
          <CssBaseline />

          <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              {!mediaLessthanmd && (
                <Grid container style={{ flex: "6" }}>
                  <img
                    src="/assets/signin.png"
                    alt=""
                    style={{
                      height: "90%",
                      width: "90%",
                      backgroundSize: "cover",
                      opacity: "1"
                    }}
                    />
                </Grid>
              )}
              <div style={{ flex: "6" }}>
                <Typography component="h1" variant="h5"
                style={{
                  display: 'flex', 
                justifyContent: 'center',
                marginBottom: '20px'
                }}
                >
                  SIGN IN
                </Typography>

                <Grid
                  container
                  spacing={2}
                  style={{
                    display: mediaLessthanmd && "flex",
                    alignItems: mediaLessthanmd && "center",
                    justifyContent: mediaLessthanmd && "center"
                  }}
                  >


                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "white"
                        }
                      }}
                      InputProps={{
                        style: {
                          color: "white"
                        }
                      }}
                      type="email"
                      inputRef={email}
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                      InputLabelProps={{
                        style: {
                          color: "white"
                        }
                      }}
                      InputProps={{
                        style: {
                          color: "white"
                        }
                      }}
                      type="password"
                      inputRef={password}
                      />
                  </Grid>

                  <Grid Item md={12} xs={8} >
                    <Button
                      type="submit"
                      
                      variant="contained"
                      style={{
                        margin: "20px  20px ",
                        width : '98%',
                        marginLeft: '2.5%'
                      }}
        
                      disabled={isFetching}
                    >
                      {isFetching ? (
                        <CircularProgress  size="20px" style={{color :'white'}}/>
                        ) : (
                        "Log In"
                        )}

                    </Button>
                  </Grid>
                          
                      <Grid Item md={12} sm={8}>  
                      <div className="linksContainer" style={{ width: '100%', display: "flex", alignItems: "flex-start", 
                          justifyContent: 'space-between'}}>

                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        
                          <Link href="/register" variant="body2">
                            Don't have an account? Sign Up
                          </Link>
                        
        
                      </div>
                      </Grid>
                </Grid>

              </div>
            </div>
          </form>
        </Container>
      </ThemeProvider>
    </div>
    </>
  );
}

