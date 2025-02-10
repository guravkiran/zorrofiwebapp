import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";

import { Formik } from "formik";

import * as Yup from "yup";
 
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid2";

import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";

import { styled, useTheme } from "@mui/material/styles";

import LoadingButton from "@mui/lab/LoadingButton";
 
// GLOBAL CUSTOM COMPONENTS

import ZorroFiLogo from "app/components/ZorroFiLogo";

import MatxDivider from "app/components/MatxDivider";

import { Paragraph, Span } from "app/components/Typography";

// GLOBAL CUSTOM HOOKS

import useAuth from "app/hooks/useAuth";
 
// STYLED COMPONENTS

const MsButton = styled(Button)(({ theme }) => ({

  color: "rgba(0, 0, 0, 0.87)",

  boxShadow: theme.shadows[0],

  backgroundColor: "#e0e0e0",

  "&:hover": { backgroundColor: "#d5d5d5" }

}));
 
const Logo = styled("div")({

  gap: 10,

  display: "flex",

  alignItems: "center",

  "& span": { fontSize: 26, lineHeight: 1.3, fontWeight: 800 }

});
 
const FirebaseRoot = styled("div")(({ theme }) => ({

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  background: "linear-gradient(90deg, #AD242C, #F4872F, #FCB33B)",

  minHeight: "100vh !important",

  "& .card": { maxWidth: 800, margin: "1rem" },

  "& .cardLeft": {

    color: "#fff",

    height: "100%",

    display: "flex",

    padding: "32px 56px",

    flexDirection: "column",
    
    backgroundSize: "cover",

    background: "#161c37 url(/assets/images/bg-3.png) no-repeat",

    [theme.breakpoints.down("sm")]: { minWidth: 200 },

    "& img": { width: 120, height: 32 }

  },

  "& .mainTitle": {

    fontSize: 18,

    lineHeight: 1.3,

    marginBottom: 24

  },

  "& .item": {

    position: "relative",

    marginBottom: 12,

    paddingLeft: 16,

    "&::after": {

      top: 8,

      left: 0,

      width: 4,

      height: 4,

      content: '""',

      borderRadius: 4,

      position: "absolute",

      backgroundColor: theme.palette.error.main

    }

  }

}));
 
export default function MsalLogin() {

  const theme = useTheme();

  const navigate = useNavigate();

  const { state } = useLocation();

  const { enqueueSnackbar } = useSnackbar();

  const { signInWithEmail, signInWithMicrosoft } = useAuth(); // Changed to use MSAL hooks
 
  const handleFormSubmit = async (values) => {

    try {

      // Handle Email login

      await signInWithEmail(values.email, values.password);

      navigate(state ? state.from : "/");

      enqueueSnackbar("Logged In Successfully", { variant: "success" });

    } catch (error) {

      enqueueSnackbar(error.message, { variant: "error" });

    }

  };
 
  const handleMicrosoftLogin = async () => {

    try {

      // Use MSAL to sign in with Microsoft

      await signInWithMicrosoft();

      navigate("/");

    } catch (e) {

      console.error(e);

    }

  };
 
  return (
<FirebaseRoot>
<Card className="card">
<Grid container>
<Grid size={{ md: 6, xs: 12 }}>
<div className="cardLeft">
<Logo>
<ZorroFiLogo /> <span>Inteligence</span>
</Logo>
 
              <h1 className="mainTitle">Banker Web App</h1>
 
              <div className="features">
<div className="item">Banker App Login</div>
<div className="item">Flexi Dashboard</div>
<div className="item">Earn Rewards</div>
</div>
 
              <Span flexGrow={1}></Span>
 
              
</div>
</Grid>
 
          <Grid size={{ md: 6, xs: 12 }}>
<Box px={4} pt={4}>
<h1 className="mainTitle">Sign In With </h1>

<MsButton

                fullWidth

                variant="contained"

                onClick={handleMicrosoftLogin} // Trigger MSAL login

                startIcon={<img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" alt="microsoft" />}>

                
</MsButton>
</Box>
 
            
</Grid>
</Grid>
</Card>
</FirebaseRoot>

  );

}

 