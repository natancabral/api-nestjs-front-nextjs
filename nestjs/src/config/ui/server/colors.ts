export class TerminalColors {
  static readonly _ = `\x1b[0;37m`;
  static readonly reset = "\x1b[0m";
  static readonly bright = "\x1b[1m";
  static readonly dim = "\x1b[2m";
  static readonly underscore = "\x1b[4m";
  static readonly blink = "\x1b[5m";
  static readonly reverse = "\x1b[7m";
  static readonly hidden = "\x1b[8m";

  static readonly black = "\x1b[30m";
  static readonly red = "\x1b[31m";
  static readonly green = "\x1b[32m";
  static readonly yellow = "\x1b[33m";
  static readonly blue = "\x1b[34m";
  static readonly magenta = "\x1b[35m";
  static readonly cyan = "\x1b[36m";
  static readonly white = "\x1b[37m";

  static readonly BGblack = "\x1b[40m";
  static readonly BGred = "\x1b[41m";
  static readonly BGgreen = "\x1b[42m";
  static readonly BGyellow = "\x1b[43m";
  static readonly BGblue = "\x1b[44m";
  static readonly BGmagenta = "\x1b[45m";
  static readonly BGcyan = "\x1b[46m";
  static readonly BGwhite = "\x1b[47m";
}
