import { Grid } from "@mui/material";
import ActionAreaCard from "../cards";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { listDir } from "../../../apis/catalogueApis";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "@mui/material/Link";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export interface DirMetaData {
  name: string;
  type: "Folder" | "File";
  extension?: string;
}

const CatalogueView = () => {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [dir, setDir] = useState<DirMetaData[]>([]);

  useEffect(() => {
    (async () => {
      const res: DirMetaData[] = await listDir(
        location.pathname.replace("/catalogue", "") || ""
      );
      setDir(res);
    })();
  }, [location]);

  return (
    <Box sx={{ padding: "24px", width: "100vw" }}>
      <div style={{ width: "100%", marginBottom: "16px" }}>
        <Breadcrumbs
          maxItems={6}
          style={{ paddingBottom: "8px" }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <LinkRouter underline="hover" color="inherit" to="/">
            Home
          </LinkRouter>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
              <Typography color="text.primary" key={to}>
                {to.substring(to.lastIndexOf("/") + 1)}
              </Typography>
            ) : (
              <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                {to.substring(to.lastIndexOf("/") + 1)}
              </LinkRouter>
            );
          })}
        </Breadcrumbs>
        <Divider />
      </div>
      <Grid
        container
        spacing={2}
        direction={"row"}
        alignItems={"stretch"}
      >
        {dir.some((el) => el.type === "Folder") && (
          <>
            <Grid item xs={12} key={"head-folder"}>
              <Typography color="text.primary">Folders</Typography>
            </Grid>
            {dir
              .filter((el) => el.type === "Folder")
              .map((d) => (
                <Grid item xs={6} md={4} lg={3} xl={2} key={d.name}>
                  <ActionAreaCard metaData={d} />
                </Grid>
              ))}

            <Grid item xs={12}>
              <Box mt={2} mb={1}>
                <Divider />
              </Box>
            </Grid>
          </>
        )}

        {dir.some((el) => el.type === "File") && (
          <>
            <Grid item xs={12} key={"head-file"}>
              <Typography color="text.primary">Files</Typography>
            </Grid>
            {dir
              .filter((el) => el.type === "File")
              .map((d) => (
                <Grid item xs={6} md={4} lg={3} xl={2} key={d.name}>
                  <ActionAreaCard outline metaData={d} />
                </Grid>
              ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CatalogueView;
