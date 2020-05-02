import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, first } from 'rxjs/operators';
import { equals } from '@ngx-translate/core/esm2015/lib/util';

@Pipe({
  name: 'ParamsTranslate'
})
export class ParamsTranslatePipe implements PipeTransform {
  private lastParams: {};
  private lastArgs: any[];

  constructor(private translate: TranslateService) {
  }

  transform(obj, ...args) {
    console.log(obj);
    if (equals(obj, this.lastParams) && equals(args, this.lastArgs)) {
      console.log('Equ: ' );
      return obj;
    }

    const newObject = Object.assign({}, obj);
    Object.keys(obj).forEach(
      key =>
        obj[key].length
          ? this.translate
            .get(obj[key])
            .pipe(first(), map(value => value))
            .subscribe(value => (newObject[key] = value))
          : undefined
    );

    this.lastParams = newObject;
    this.lastArgs = args;
    console.log(newObject);
    return newObject;
  }
}
