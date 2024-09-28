export class FormatDate {
  static format = (value: any) => {
    try {
      let date: Date;

      if (typeof value === 'object' && value !== null && 'seconds' in value && 'nanoseconds' in value) {
        date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
      } else if (typeof value === 'string') {
        date = new Date(value);
      } else {
        throw new Error('Formato de fecha no reconocido');
      }

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
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Error al formatear la fecha";
    }
  }
}
