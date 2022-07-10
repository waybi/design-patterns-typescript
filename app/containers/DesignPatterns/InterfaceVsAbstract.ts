// 抽象类
// eslint-disable-next-line max-classes-per-file
class Level {}

abstract class Logger {
  private name: String;

  private enabled: boolean;

  private minPermittedLevel: Level;

  protected constructor(
    name: String,
    enabled: boolean,
    minPermittedLevel: Level,
  ) {
    this.name = name;
    this.enabled = enabled;
    this.minPermittedLevel = minPermittedLevel;
  }

  public log(level: Level, message: String): void {
    this.doLog(level, message);
  }

  protected abstract doLog(level: Level, message: String);
}

class Writer {}
class FileWriter {
  private filePath: String;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(filePath: String) {
    this.filePath = filePath;
  }

  private doSomething(): void {}
}

class FileLogger extends Logger {
  private fileWriter: Writer;

  constructor(
    name: String,
    enabled: boolean,
    minPermittedLevel: Level,
    filePath: String,
  ) {
    super(name, enabled, minPermittedLevel);
    this.fileWriter = new FileWriter(filePath);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected doLog(level: Level, message: String) {
    // do something...
  }
}

class RpcRequest {}
// 接口
interface Filter {
  doFilter(req: RpcRequest): void;
}

// 接口
interface Filter2 {
  doFilter2(req: RpcRequest): void;
}

abstract class IFilter {
  protected abstract doFilter(req: RpcRequest): void;
}

class AuthencationFilter implements Filter, Filter2 {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public doFilter(req: RpcRequest): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public doFilter2(req: RpcRequest): void {}
}

class RateLimitFilter extends IFilter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public doFilter(req: RpcRequest): void {}
}

const rf = new RateLimitFilter();
rf.doFilter({ name: 'waybi' });

const authencationFilter: Filter2 = new AuthencationFilter();
authencationFilter.doFilter2({ name: 'nidaye' });
