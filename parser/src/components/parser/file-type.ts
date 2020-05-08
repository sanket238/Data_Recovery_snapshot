const mime = require("mime-types");

export const filetype = (filename: string) => {
  let mimetype = mime.lookup(filename);
  switch (mimetype.split("/")[0]) {
    case "image":
      return "image";

    case "video":
      return "video";

    case "audio":
      return "audio";

    case "application":
      switch (mimetype) {
        case "application/vnd.ms-powerpoint":
          return "ppt";

        case "application/msword":
          return "word";

        case "application/vnd.ms-excel":
          return "excel";

        case "application/pdf":
          return "pdf";

        default:
          return "other";
      }
    default:
      return "other";
  }
};
