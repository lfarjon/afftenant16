import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date): string {
    const dateValue = new Date(value);
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    if (dateValue > oneWeekAgo) {
      // Return in 'EEEE, h:mm a' format (Tuesday at 8:45 PM)
      const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
        dateValue
      );
      const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(dateValue);
      return `${day} at ${time}`;
    } else {
      // Return in 'MMMM d, y' format (December 21, 2022)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateValue);
    }
  }
}
