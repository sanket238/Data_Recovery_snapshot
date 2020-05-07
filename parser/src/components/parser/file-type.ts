const mime = require("mime-types");

export const filetype = (filename: string) => {
  let mimetype = mime.lookup(filename);
  switch (mimetype.split("/")[0]) {
    case "image":
      return "Image";

    case "video":
      return "Video";

    case "audio":
      return "Audio";

    case "application":
      switch (mimetype) {
        case "application/msword":
          return "MS Word Document";

        case "application/vnd.ms-excel":
          return "MS Excel Document";

        case "application/pdf":
          return "PDF Document";

        default:
          return "Unknown";
      }
    default:
      return "Unknown";
  }
};
