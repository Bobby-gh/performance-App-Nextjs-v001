'use client'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


export const LoadingPopup = () => {
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const delay = setTimeout(() => {
        setLoading(false); 
        clearTimeout(delay);
      }, 2000);
      return () => {
        clearTimeout(delay);
      };
    }, []);
  
    return (
      <Backdrop open={isLoading} style={{ zIndex: 9999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };