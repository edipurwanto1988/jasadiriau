"use client";

import Stack from "@mui/material/Stack";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    InstapaperIcon,
    InstapaperShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon
} from "react-share";

const ButtonShare = ({
  shareUrl,
  title,
}: {
  shareUrl: string;
  title: string;
}) => {
  return (
    <Stack direction={"row"} spacing={1} mt={1} overflow={'auto'}>
      <div>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div>
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div>
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div>
        <TumblrShareButton url={shareUrl} title={title}>
          <TumblrIcon size={32} round />
        </TumblrShareButton>
      </div>

      <div>
        <EmailShareButton url={shareUrl} subject={title} body="body">
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>

      <div>
        <LineShareButton url={shareUrl} title={title}>
          <LineIcon size={32} round />
        </LineShareButton>
      </div>

      <div>
        <InstapaperShareButton url={shareUrl} title={title}>
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>
      </div>
    </Stack>
  );
};

export default ButtonShare;
