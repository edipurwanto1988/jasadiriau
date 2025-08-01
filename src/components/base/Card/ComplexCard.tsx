import React, { JSX } from "react";
import Card, { CardProps } from "@mui/material/Card";
import CardHeader, { CardHeaderProps } from "@mui/material/CardHeader";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import CardActions, { CardActionsProps } from "@mui/material/CardActions";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import use from "ezhooks/lib/utils";

export interface ComplexCardProps extends CardProps {
  avatar?: AvatarProps;
  title?: string;
  action?: JSX.Element & React.ReactNode;
  subheader?: string & React.ReactNode;
  headerProps?: { divider?: boolean } & CardHeaderProps;
  cardAction?: CardActionsProps;
  cardContent?: CardContentProps;
  cardMedia?: CardMediaProps;
  hideHeader?: boolean;
}

const ComplexCard = ({
  avatar,
  title,
  action,
  subheader,
  headerProps,
  cardAction,
  cardContent,
  cardMedia,
  hideHeader,
  ...props
}: ComplexCardProps): JSX.Element => {
  return (
    <Card {...props}>
      {hideHeader ? null : (
        <CardHeader
          avatar={avatar ? <Avatar {...avatar} /> : undefined}
          action={action}
          title={title}
          subheader={subheader}
          {...use.omit(headerProps || {}, ["divider", "sx"])}
          sx={{
            ...headerProps?.sx,
            ...(headerProps?.divider
              ? { borderBottom: 1, borderBottomColor: "divider" }
              : undefined),
          }}
        />
      )}
      {cardMedia ? <CardMedia {...cardMedia} /> : null}
      {cardContent ? <CardContent {...cardContent} /> : null}
      {cardAction ? <CardActions disableSpacing {...cardAction} /> : null}
    </Card>
  );
};

export default React.memo(ComplexCard) as typeof ComplexCard;
