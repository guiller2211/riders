export class FormatDate {
  static format = (value: any ) => {
    const createdDate = typeof value === 'string'
      ? JSON.parse(value)
      : value;
    const date = new Date(createdDate.seconds * 1000 + createdDate.nanoseconds / 1000000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    return date.toLocaleString('es-ES', options);
  }
}