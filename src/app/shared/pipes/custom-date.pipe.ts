import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform{
    transform(date: Date): string {
        return (date.getDay() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

}
