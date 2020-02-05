import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Pipe({
    name: 'statusName',
})
export class StatusPipe implements PipeTransform {
    constructor(
        private helper: HelperService
    ) { }
    transform(val: number, type: string): string {
        let statusName = '';
        switch (type) {
            case 'Sell':
                statusName = this.helper.sellStatus.find(x => x.id === val).vietnamese;
        }
        return statusName;
    }
}