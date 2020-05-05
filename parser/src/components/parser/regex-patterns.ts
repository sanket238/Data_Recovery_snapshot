export default {
  driveLetter: new RegExp(/(?:\sVolume in drive )(\w)/),
  volumeLabel: new RegExp(/(?:\sVolume\sin\sdrive\s\w\sis\s)(.+)/),
  volumeSerialNumber: new RegExp(/(?: Volume Serial Number is )(.+)/),
  directoryName: new RegExp(/(?:\sDirectory\sof\s)(.+)/),
  directoryCapture: new RegExp(
    /(?:\sDirectory\sof\s)(.+)(?:(?:\r|\n)+.*(?:\r|\n)+.*(?:(?:\r|\n)+))((?:.+(?:\r|\n){1}))+/g
  )
};
