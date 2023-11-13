export class InvalidFieldError extends Error {
  constructor (fieldLabel: string) {
    super(`invalid field: ${fieldLabel}`)
    this.name = 'InvalidFieldError'
  }
}
