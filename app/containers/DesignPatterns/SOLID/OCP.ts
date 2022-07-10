/**
 * 需求：：：
 * 其中，AlertRule 存储告警规则，可以自由设置。AlertNotification 是告警通知类，支持邮件、
 * 短信、微信、手机等多种通知渠道。NotificationEmergencyLevel 表示通知的紧急程度，
 * 包括 SEVERE（严重）、URGENCY（紧急）、NORMAL（普通）、TRIVIAL（无关紧
 * 要），不同的紧急程度对应不同的发送渠道。
 */

// eslint-disable-next-line max-classes-per-file
enum NotificationEmergencyLevel {
  SEVERE = 0,
  URGENCY,
  NORMAL,
  TRIVIAL,
}

// eslint-disable-next-line max-classes-per-file
class AlertRule {
  public getMatchedRule(api: String): number {
    // do somethings;
    console.log(api);
    return 99;
  }
}

class AlertNotification {
  public notify(type: NotificationEmergencyLevel, text: String) {
    console.error(text);
    console.error(type);
  }
}

// 未使用开闭原则
class Alert1 {
  private rule: AlertRule;

  private notification: AlertNotification;

  constructor(rule: AlertRule, notification: AlertNotification) {
    this.rule = rule;
    this.notification = notification;
  }

  public check(
    api: String,
    requestCont: number,
    errorCount: number,
    durationOfSeconds: number,
  ): void {
    const tps: number = requestCont / durationOfSeconds;
    if (tps > this.rule.getMatchedRule(api)) {
      this.notification.notify(NotificationEmergencyLevel.NORMAL, '...');
    }

    if (errorCount > this.rule.getMatchedRule(api)) {
      this.notification.notify(NotificationEmergencyLevel.SEVERE, '...');
    }

    // 增加逻辑需要在此处修改
  }
}

class ApiStatInfo {
  // 省略 constructor/getter/setter 方法
  private _api: String;
  private _requestCount: number;
  private _errorCount: number;
  private _durationOfSeconds: number;

  set requestCount(value: number) {
    this._requestCount = value;
  }

  set api(value: String) {
    this._api = value;
  }

  set errorCount(value: number) {
    this._errorCount = value;
  }

  set durationOfSeconds(value: number) {
    this._durationOfSeconds = value;
  }

  get requestCount(): number {
    return this._requestCount;
  }

  get durationOfSeconds(): number {
    return this._durationOfSeconds;
  }

  get errorCount(): number {
    return this._errorCount;
  }

  get api(): String {
    return this._api;
  }

  getRequestCount(): void {}
  getDurationOfSeconds(): void {}
  getApi(): String {
    return 'http://api.com';
  }
}

abstract class AlertHandler {
  protected rule: AlertRule;
  protected notification: AlertNotification;
  protected constructor(rule: AlertRule, notification: AlertNotification) {
    this.rule = rule;
    this.notification = notification;
  }

  abstract check(apiStatInfo: ApiStatInfo): void;
}

class Alert2 {
  private alertHandlers: AlertHandler[] = [];
  addAlertHandler(alertHandler: AlertHandler): void {
    this.alertHandlers.push(alertHandler);
  }

  check(apiStatInfo: ApiStatInfo): void {
    this.alertHandlers.forEach(handler => {
      handler.check(apiStatInfo);
    });
  }
}

class TpsAlertHandler extends AlertHandler {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(rule: AlertRule, notification: AlertNotification) {
    super(rule, notification);
  }

  public void;

  check(apiStatInfo: ApiStatInfo) {
    const tps: number = 10086;

    if (tps > this.rule.getMatchedRule(apiStatInfo.getApi())) {
      this.notification.notify(NotificationEmergencyLevel.URGENCY, '...');
    }
  }
}
class ErrorAlertHandler extends AlertHandler {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(rule: AlertRule, notification: AlertNotification) {
    super(rule, notification);
  }

  public void;

  check(apiStatInfo: ApiStatInfo) {
    // do somethings
    console.log(apiStatInfo);
  }
}

// 改动二：添加新的 handler
class TimeoutAlertHandler extends AlertHandler {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(rule: AlertRule, notification: AlertNotification) {
    super(rule, notification);
  }

  check(apiStatInfo: ApiStatInfo): void {
    console.log(apiStatInfo);
  }
  // 省略代码...
}

class ApplicationContext {
  private alertRule: AlertRule;
  private notification: AlertNotification;
  private alert: Alert2;

  public initializeBeans(): void {
    this.alertRule = new AlertRule();
    this.notification = new AlertNotification();
    this.alert = new Alert2();
    this.alert.addAlertHandler(
      new TpsAlertHandler(this.alertRule, this.notification),
    );

    this.alert.addAlertHandler(
      new ErrorAlertHandler(this.alertRule, this.notification),
    );

    // 新增代码
    this.alert.addAlertHandler(
      new TimeoutAlertHandler(this.alertRule, this.notification),
    );
  }

  public getAlert(): Alert2 {
    return this.alert;
  }

  private static instance: ApplicationContext = new ApplicationContext();
  private constructor() {
    ApplicationContext.instance.initializeBeans();
  }

  public static getInstance(): ApplicationContext {
    return this.instance;
  }
}

export function demo() {
  const apiStatInfo: ApiStatInfo = new ApiStatInfo();
  ApplicationContext.getInstance().getAlert().check(apiStatInfo);
}
