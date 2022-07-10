// eslint-disable-next-line max-classes-per-file
enum State {
  SMALL = 0,
  SUPER,
  CAPE,
  FIRE,
}

enum Event {
  GOT_MUSHROOM = 0,
  GOT_CAPE,
  GOT_FIRE,
  MET_MONSTER,
}

/**
 * 分支逻辑法
 */
class MarioStateMachine {
  private score: number;

  private currentState: State;

  constructor() {
    this.score = 0;
    this.currentState = State.SMALL;
  }

  public obtainMushRoom(): void {
    if (this.currentState === State.SMALL) {
      this.score += 100;
      this.currentState = State.SUPER;
    }
  }

  public obtainCape(): void {
    if (
      this.currentState === State.SMALL ||
      this.currentState === State.SUPER
    ) {
      this.currentState = State.CAPE;
      this.score += 200;
    }
  }

  public obtainFireFlower(): void {
    if (
      this.currentState === State.SMALL ||
      this.currentState === State.SUPER
    ) {
      this.currentState = State.FIRE;
      this.score += 300;
    }
  }

  public meetMonster(): void {
    if (this.currentState === State.SUPER) {
      this.currentState = State.SMALL;
      this.score -= 100;

      return;
    }

    if (this.currentState === State.CAPE) {
      this.currentState = State.SMALL;
      this.score -= 200;

      return;
    }

    if (this.currentState === State.FIRE) {
      this.currentState = State.SMALL;
      this.score -= 300;
    }
  }

  public getScore(): number {
    console.log('score::', this.score);
    return this.score;
  }

  public getCurrentState(): State {
    console.log('current state::', this.currentState);
    return this.currentState;
  }
}

/**
 * 查表法
 */
class MarioStateTableMachine {
  private score: number;

  private currentState: State;

  private static transitionTable: State[][] = [
    [State.SUPER, State.CAPE, State.FIRE, State.SMALL],
    [State.SUPER, State.CAPE, State.FIRE, State.SMALL],
    [State.CAPE, State.CAPE, State.CAPE, State.SMALL],
    [State.FIRE, State.FIRE, State.FIRE, State.SMALL],
  ];

  private static actionTable: number[][] = [
    [+100, +200, +300, +0],
    [+0, +200, +300, -100],
    [+0, +0, +0, -200],
    [+0, +0, +0, -300],
  ];

  constructor() {
    this.score = 0;
    this.currentState = State.SMALL;
  }

  public obtainMushRoom(): void {
    this.executeEvent(Event.GOT_MUSHROOM);
  }

  public obtainCape(): void {
    this.executeEvent(Event.GOT_CAPE);
  }

  public obtainFireFlower(): void {
    this.executeEvent(Event.GOT_FIRE);
  }

  public meetMonster(): void {
    this.executeEvent(Event.MET_MONSTER);
  }

  public executeEvent(event: Event): void {
    const stateValue: number = this.currentState.valueOf();
    const eventValue: number = event.valueOf();
    this.currentState =
      MarioStateTableMachine.transitionTable[stateValue][eventValue];
    this.score = MarioStateTableMachine.actionTable[stateValue][eventValue];
  }

  public getScore(): number {
    console.log(this.score);
    return this.score;
  }

  public getCurrentState(): State {
    console.log(this.currentState);
    return this.currentState;
  }
}

/**
 * 状态模式
 * @constructor
 */
interface IMario {
  getName(): State;
  obtainMushRoom(stateMachine: MarioStateModelMachine): void;
  obtainCape(stateMachine: MarioStateModelMachine): void;
  obtainFireFlower(stateMachine: MarioStateModelMachine): void;
  meetMonster(stateMachine: MarioStateModelMachine): void;
}

class SmallMario implements IMario {
  private static instance: SmallMario = new SmallMario();

  private constructor() {}

  public static getInstance(): SmallMario {
    return this.instance;
  }

  public getName(): State {
    return State.SMALL;
  }

  public obtainMushRoom(stateMachine: MarioStateModelMachine): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stateMachine.setCurrentState(SuperMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() + 100);
  }

  public obtainCape(stateMachine: MarioStateModelMachine): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stateMachine.setCurrentState(CapeMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() + 100);
  }

  public obtainFireFlower(stateMachine: MarioStateModelMachine): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stateMachine.setCurrentState(FireMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() + 100);
  }

  public meetMonster(): void {
    // do nothing...
  }
}

class SuperMario implements IMario {
  private static instance: SuperMario = new SuperMario();

  public static getInstance(): SuperMario {
    return this.instance;
  }

  private constructor() {}

  public getName(): State {
    return State.SUPER;
  }

  public obtainMushRoom(): void {
    // do nothing...
  }

  public obtainCape(stateMachine: MarioStateModelMachine): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stateMachine.setCurrentState(CapeMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() + 200);
  }

  public obtainFireFlower(stateMachine: MarioStateModelMachine): void {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stateMachine.setCurrentState(FireMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() + 300);
  }

  public meetMonster(stateMachine: MarioStateModelMachine): void {
    stateMachine.setCurrentState(SmallMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() - 100);
  }
}

class CapeMario implements IMario {
  private static instance: CapeMario = new CapeMario();

  public static getInstance(): CapeMario {
    return this.instance;
  }

  private constructor() {}

  public getName(): State {
    return State.CAPE;
  }

  public obtainMushRoom(): void {
    // do nothing...
  }

  public obtainCape(): void {
    // do nothing...
  }

  public obtainFireFlower(): void {
    // do nothing...
  }

  public meetMonster(stateMachine: MarioStateModelMachine): void {
    stateMachine.setCurrentState(SmallMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() - 200);
  }
}

class FireMario implements IMario {
  private static instance: FireMario = new FireMario();

  public static getInstance(): FireMario {
    return this.instance;
  }

  private constructor() {}

  public getName(): State {
    return State.FIRE;
  }

  public obtainMushRoom(): void {
    // do nothing...
  }

  public obtainCape(): void {
    // do nothing...
  }

  public obtainFireFlower(): void {
    // do nothing...
  }

  public meetMonster(stateMachine: MarioStateModelMachine): void {
    stateMachine.setCurrentState(SmallMario.getInstance());
    stateMachine.setScore(stateMachine.getScore() - 300);
  }
}

class MarioStateModelMachine {
  private score: number;

  private currentState: IMario;

  constructor() {
    this.score = 0;
    this.currentState = SmallMario.getInstance();
  }

  public obtainMushRoom(): void {
    this.currentState.obtainMushRoom(this);
  }

  public obtainCape(): void {
    this.currentState.obtainCape(this);
  }

  public obtainFireFlower(): void {
    this.currentState.obtainFireFlower(this);
  }

  public meetMonster(): void {
    this.currentState.meetMonster(this);
  }

  public getScore(): number {
    console.log('this.getScore>>>', this.score);
    return this.score;
  }

  public setScore(score): void {
    this.score = score;
  }

  public getCurrentState(): State {
    console.log('this.getCurrentState>>>', this.currentState);
    return this.currentState.getName();
  }

  public setCurrentState(currentState: IMario): void {
    this.currentState = currentState;
  }
}

class Father {
  protected name = 'fa!!!';
  protected test() {
    console.log('father test');
  }
}

class Son extends Father {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
  myTest() {
    console.log(this.name);
  }
}

export default function ApplicationDemo() {
  // const mario: MarioStateMachine = new MarioStateMachine();
  // const mario: MarioStateModelMachine = new MarioStateModelMachine();
  // mario.obtainMushRoom();
  // mario.getScore();
  // mario.getCurrentState();
  const son = new Son();
  son.myTest();
}
