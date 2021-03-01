import React from "react";
import * as moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import LocationOn from "@material-ui/icons/LocationOn";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, displayClusters, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">BreadCrumb Messages</DialogTitle>
      <List>
        {displayClusters.map((cluster) => (
          <ListItem
            button
            onClick={() => handleClose()}
            key={cluster.properties.message}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <LocationOn />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={cluster.properties.message}
              secondary={moment
                .unix(cluster.properties.creationTimeUnix)
                .format("MMMM Do YYYY, h:mm:ss a")}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
