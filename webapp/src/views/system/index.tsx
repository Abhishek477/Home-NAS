import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getSysInfo } from "../../apis/catalogueApis";

export const SystemMetric = () => {
  const [funcName, setFuncName] = useState<string>("cpu");
  const [sysInfo, setSysInfo] = useState<string>("{}");

  useEffect(() => window.Prism.highlightAll(), [sysInfo]);

  const handleClick = () => {
    (async () => {
      const res: string = await getSysInfo(funcName);
      setSysInfo(res);
    })();
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} lg={6}>
          <TextField
            id="outlined-basic"
            fullWidth
            label="Function"
            variant="outlined"
            onChange={(e) => setFuncName(e.target.value || "cpu")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sx={{height: 'fit-content'}}>
          <pre className="line-numbers">
            <code className={`language-json`}>{sysInfo}</code>
          </pre>
        </Grid>
      </Grid>
    </Box>
  );
};
