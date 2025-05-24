import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { 
  Paper, 
  CardActionArea, 
  CardMedia, 
  Grid, 
  TableContainer, 
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell, 
  Button, 
  CircularProgress,
  Box,
  Fade,
  Grow,
  Link,
  Divider
} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import CloudUpload from '@material-ui/icons/CloudUpload';
import HealingIcon from '@material-ui/icons/Healing';
import SpaIcon from '@material-ui/icons/Spa';
import bgPattern from './bg.png';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#f5f5f5',
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 600,
    marginTop: theme.spacing(3),
  },
}))(Button);

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  mediaContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    borderRadius: '16px 16px 0 0',
  },
  media: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 500,
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  gridContainer: {
    justifyContent: "center",
    padding: "2em 1em",
    minHeight: 'calc(100vh - 164px)',
    [theme.breakpoints.up('md')]: {
      padding: "4em 2em",
    },
  },
  mainContainer: {
    backgroundImage: `url(${bgPattern})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    backgroundColor: '#f8f9fa',
    height: "100%",
    marginTop: "0",
    paddingBottom: '2em',
  },
  imageCard: {
    margin: "auto",
    width: '100%',
    maxWidth: 500,
    height: 'auto',
    backgroundColor: 'white',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1) !important',
    borderRadius: '16px !important',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15) !important',
    },
  },
  imageCardEmpty: {
    height: 'auto',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
    width: '100%',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.02) !important',
    },
  },
  tableCell: {
    fontSize: '18px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#333 !important',
    fontWeight: '600',
    padding: '12px 16px',
    fontFamily: "'Poppins', sans-serif",
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#666 !important',
    fontWeight: '500',
    padding: '12px 16px',
    fontFamily: "'Poppins', sans-serif",
  },
  buttonGrid: {
    width: "100%",
    maxWidth: 500,
    padding: '0 16px',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  },
  appbar: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    color: 'white',
    padding: '0 2em',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
  },
  loader: {
    color: '#4facfe !important',
  },
  title: {
    fontWeight: 700,
    letterSpacing: '0.5px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.5rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8rem',
    },
  },
  dropzone: {
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '2px dashed #4facfe !important',
    borderRadius: '16px !important',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
    },
  },
  dropzoneText: {
    color: '#666',
    fontSize: '1.1rem',
    fontWeight: 500,
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '0 16px',
  },
  dropzoneIcon: {
    fontSize: '3rem',
    color: '#4facfe',
    marginBottom: '1rem',
  },
  confidenceMeter: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginTop: '12px',
    overflow: 'hidden',
  },
  confidenceBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
  },
  healthyIcon: {
    color: '#4CAF50',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  diseaseIcon: {
    color: '#F44336',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  resultContainer: {
    padding: theme.spacing(3),
    borderRadius: '12px',
    marginTop: theme.spacing(2),
    background: 'rgba(79, 172, 254, 0.1)',
    borderLeft: '4px solid #4facfe',
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
    textAlign: 'center',
  },
  headerTitle: {
    fontWeight: 800,
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: "'Poppins', sans-serif",
  },
  headerSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    marginBottom: theme.spacing(3),
  },
  footer: {
    backgroundColor: '#f8f9fa',
    padding: theme.spacing(3),
    textAlign: 'center',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    marginTop: 'auto',
  },
  footerText: {
    color: '#666',
    fontSize: '0.9rem',
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);

  const sendFile = async () => {
    if (!selectedFile) return;
    
    let formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (res.status === 200) {
        setData(res.data);
        setShowButton(true);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setShowButton(false);
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setError(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (image && preview) {
      sendFile();
    }
  }, [image, preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      clearData();
      return;
    }
    setSelectedFile(files[0]);
    setData(null);
    setImage(true);
  };

  const confidence = data && data.confidence 
    ? Math.round(data.confidence * 1000) / 10 // Convert to percentage with one decimal
    : 0;

  return (
    <React.Fragment>
      <Box className={classes.headerContent}>
        <Typography variant="h1" className={classes.headerTitle}>
          AI-Powered Potato Disease Detection
        </Typography>
        <Typography variant="subtitle1" className={classes.headerSubtitle}>
          Upload an image of a potato leaf and our machine learning model will analyze it for early signs of disease
        </Typography>
      </Box>

      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Box className={classes.contentWrapper}>
              <Fade in={true} timeout={800}>
                <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
                  {image && (
                    <div className={classes.mediaContainer}>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        image={preview}
                        alt="Uploaded potato leaf"
                      />
                    </div>
                  )}
                  {!image && (
                    <CardContent>
                      <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={
                          <div>
                            <CloudUpload className={classes.dropzoneIcon} />
                            <Typography variant="subtitle1" className={classes.dropzoneText}>
                              Drag & drop an image of a potato leaf here<br />
                              or click to browse files
                            </Typography>
                          </div>
                        }
                        filesLimit={1}
                        showAlerts={false}
                        onChange={onSelectFile}
                        dropzoneClass={classes.dropzone}
                        dropzoneParagraphClass={classes.dropzoneText}
                      />
                    </CardContent>
                  )}
                  {error && (
                    <CardContent className={classes.detail}>
                      <Typography color="error" variant="body1">
                        {error}
                      </Typography>
                    </CardContent>
                  )}
                  {data && (
                    <CardContent className={classes.detail}>
                      <Box className={classes.resultContainer}>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                          <Table className={classes.table} size="small">
                            <TableHead className={classes.tableHead}>
                              <TableRow className={classes.tableRow}>
                                <TableCell className={classes.tableCell1}>Diagnosis</TableCell>
                                <TableCell align="right" className={classes.tableCell1}>Confidence</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBody}>
                              <TableRow className={classes.tableRow}>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                  {data[0].toLowerCase().includes('healthy') ? (
                                    <span><HealingIcon className={classes.healthyIcon} /> {data[0]}</span>
                                  ) : (
                                    <span><SpaIcon className={classes.diseaseIcon} /> {data[0]}</span>
                                  )}
                                </TableCell>
                                <TableCell align="right" className={classes.tableCell}>
                                  {data[1]}
                                  <div className={classes.confidenceMeter}>
                                    <div 
                                      className={classes.confidenceBar} 
                                      style={{ width: `${confidence}%` }}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </CardContent>
                  )}
                  {isLoading && (
                    <CardContent className={classes.detail}>
                      <CircularProgress className={classes.loader} thickness={5} size={60} />
                      <Typography variant="h6" className={classes.title} style={{ marginTop: '1rem' }}>
                        Analyzing Leaf...
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Fade>
              {showButton && (
                <Grow in={showButton} timeout={500}>
                  <Grid item className={classes.buttonGrid}>
                    <ColorButton 
                      variant="contained" 
                      onClick={clearData} 
                      startIcon={<Clear />}
                      fullWidth
                    >
                      Analyze Another Leaf
                    </ColorButton>
                  </Grid>
                </Grow>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <footer className={classes.footer}>
        <Divider style={{ marginBottom: '16px' }} />
        <Typography variant="body2" className={classes.footerText}>
          Created with ❤️ by Naresh B A
        </Typography>
        <Typography variant="caption" display="block" className={classes.footerText} style={{ marginTop: '8px' }}>
          © {new Date().getFullYear()} Potato Disease Classifier
        </Typography>
      </footer>
    </React.Fragment>
  );
};