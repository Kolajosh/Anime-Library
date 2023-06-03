import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
// import { makeStyles } from "@material-ui";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    backgroundColor: "transparent",
    [theme.breakpoints?.up("md")]: {
      padding: `${theme.spacing(4)}px !important`,
    },
    height: "100%",
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px !important`,
  },
  cardFooter: {
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
    },
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  cardHeader: {
    "& .MuiCardHeader-action": {
      margin: 0,
    },
    "& .MuiCardHeader-title": {
    //   color: theme.palette.alat.gray,
    },
    "&.red": {
      borderColor: theme.palette.primary.main,
    },
    borderBottom: `1px solid #e6e6e6`,
    color: `#9f9f9f`,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(4)}px`,
    },
  },
  cardRoot: {
    "&.autoHeight": {
      height: "auto",
    },
    "&.center": {
      margin: "0 auto",
    },
    "&.fullWidth": {
      maxWidth: "100%",
    },
    "&.left": {
      margin: 0,
    },
    "&.lg": {
      maxWidth: 1200,
    },
    "&.md": {
      maxWidth: 1060,
    },
    "&.xs": {
      maxWidth: 470,
    },
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0 5px 20px rgb(0 0 0 0 5%)",
    height: "100%",
    maxWidth: 768,
    width: "100%",
  },
  subTitle: {
    color: `#9f9f9f`,
    fontWeight: 600,
    marginTop: theme.spacing(0.5),
  },
  title: {
    "&.boldTitle": {
      fontWeight: 700,
    },
    // color: theme.palette.alat.gray,
    fontWeight: 500,
  },
}));

const SimpleCard = ({
  title,
  subtitle,
  redBorder = false,
  children,
  className,
  headerAction,
  footer,
  centerTitle = false,
  titleVariant = "body1",
  titleColor = "initial",
  align = "center",
  alignCard = "center",
  md = false,
  lg = false,
  xs = false,
  fullWidth = true,
  boldTitle = false,
  autoHeight,
  cardContentRef,
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(
        classes.cardRoot,
        className,
        alignCard,
        md && "md",
        lg && "lg",
        xs && "xs",
        fullWidth && "fullWidth",
        autoHeight && "autoHeight"
      )}
    >
      {title && (
        <CardHeader
          disableTypography
          className={clsx(
            classes.cardHeader,
            centerTitle && "text-center",
            redBorder && "red"
          )}
          title={
            <Typography
              align={align}
              variant={titleVariant}
              color={titleColor}
              className={clsx(classes.title, boldTitle && "boldTitle")}
            >
              {title}
            </Typography>
          }
          subheader={
            subtitle && (
              <Typography
                align={align}
                className={classes.subTitle}
                variant="body2"
                component="p"
              >
                {subtitle}
              </Typography>
            )
          }
          action={headerAction}
        />
      )}
      <CardContent ref={cardContentRef} className={classes.cardContent}>
        {children}
      </CardContent>
      {footer && (
        <CardActions className={classes.cardFooter}>{footer}</CardActions>
      )}
    </Card>
  );
};

SimpleCard.propTypes = {
  align: PropTypes.oneOf(["center", "left", "right"]),
  alignCard: PropTypes.string,
  autoHeight: PropTypes.bool,
  boldTitle: PropTypes.bool,
  cardContentRef: PropTypes.node,
  centerTitle: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
  fullWidth: PropTypes.bool,
  headerAction: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  lg: PropTypes.bool,
  md: PropTypes.bool,
  redBorder: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleVariant: PropTypes.string,
  xs: PropTypes.bool,
};

export default SimpleCard;
