export interface UserInterface {
  readonly userName: string;
  readonly realmName: string;
  readonly userId: string;
  readonly manuallyEnabledTime: number;
  readonly created: number;
  readonly lastLogin: number;
  readonly comment: string;
  readonly enabled: boolean;
}
