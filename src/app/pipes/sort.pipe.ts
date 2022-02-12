import { Pipe, PipeTransform } from '@angular/core';
import { orderBy, sortBy } from 'lodash';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  transform<T>(
    value: T[],
    caseInsensitive = false,
    order: any = '',
    column: string = ''
  ): T[] {
    if (!value || order === '' || !order) {
      return value;
    }
    if (!column || column === '') {
      const sorted = this.sortOnCaseSensitivity(value, caseInsensitive);
      if (order === 'asc') {
        return sorted;
      } else {
        return sorted.reverse();
      }
    }
    if (value.length <= 1) {
      return value;
    } else {
      const converted = this.convertMultiOnCaseSensitivity(
        value,
        column,
        caseInsensitive
      );
      return orderBy(converted, ['sortCol'], [order]).map((v) => {
        delete v['sortCol'];
        return v;
      });
    }
  }

  sortOnCaseSensitivity<T>(value: T[], caseInsensitive: boolean): T[] {
    return sortBy(value, (v: T) => {
      if (typeof v === 'string' && caseInsensitive) {
        return v.toLowerCase();
      }
      return v;
    });
  }

  convertMultiOnCaseSensitivity<T>(
    value: T[],
    column: string,
    caseInsensitive: boolean
  ): T[] {
    let converted = value.map((v: T) => ({ ...v, sortCol: v[column] }));
    if (caseInsensitive) {
      converted = value.map((v: T) => {
        if (typeof v[column] === 'string') {
          return { ...v, sortCol: v[column].toLowerCase() };
        }
        return { ...v, sortCol: v[column] };
      });
    }
    return converted;
  }
}
