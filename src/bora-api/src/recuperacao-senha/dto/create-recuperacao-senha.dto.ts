export class CreateRecoveryDto {
  readonly userId: string;
  readonly token: string;
  readonly expiresAt: Date;
}
