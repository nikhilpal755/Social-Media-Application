import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { useRef ,useState} from "react";
import axios from "axios";

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

export default function Register() {
  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();



  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userName.current.value)

    // ----------------- If username or email already exists -------------------------
    let wrongUsername = false;
    let wrongEmail = false;
    try{
      const users = await axios.get('/api/users/all');
      console.log(users.data)
      users.data.map(u =>{
        if(u.username === userName){
          wrongUsername = true;
        }
        if(u.email === email){
          wrongEmail = true;
        }
      })
    }catch(err){
      console.log(err);
    }
    if(wrongUsername){
      return ;
    }
    if(wrongEmail){
      return;
    }


    //------------------------- password checking-----------------------------
    
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity(
        "password is not matching... Please write carefully"
      );
    } else {

      //------------------ Creating a user -----------------------------------
      const user = {
        username: userName,
        email: email,
        password: password.current.value
      };
      try {
        await axios.post("/api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
     
     <div className="container" style={{height:'100vh' , backgroundColor:'rgb(27, 25, 25)', color : 'white'}}>
      <Typography
        component="h1"
        variant="h3"
        style={{
          display: !mediaLessthanmd ? "" : "flex",
          paddingLeft: !mediaLessthanmd ? "10%" : "0%",
          paddingTop: !mediaLessthanmd ? "4%" : "0%",
          justifyContent: mediaLessthanmd && "center",
          textShadow: "3px 3px blue",
          cursor: "pointer"
        }}
      >
        Socionik
      </Typography>

      <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />

          <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit}>
            <div className="registrationForm" style={{ display: "flex" }}>
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
              <div className="registrationFormContainer" style={{ flex: "6" }}>
                <Typography component="h1" variant="h5" 
                style={{display: 'flex', 
                justifyContent: 'center',
                marginBottom: '20px'
                }}>
                  SIGN UP
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
                      label="Username"
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
                      type="text"
                      onChange={(e) =>setUserName(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                  
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
                      onChange={(e) =>setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                
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
                  <Grid item md={12} xs={8}>
                    <CssTextField
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      required
        
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
                      inputRef={confirmPassword}
                    />
                  </Grid>
                  <Grid item md={12} xs={8}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>

                  <Grid item md={12} xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
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
