import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'localDateTime',
  standalone: true
})
export class LocalDateTimePipe implements PipeTransform {

  transform(date: string): string {
    var momentDate = moment(date);  
    return momentDate.format("DD/MM/YYYY");
  }
}