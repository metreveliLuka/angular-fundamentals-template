import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform{
    transform(date: Date): string {
        return date.getDate().toString().padStart(2,'0') + '.' + (date.getMonth() + 1).toString().padStart(2,'0') + '.' + date.getFullYear();
    }

}
