import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {Tag} from '../../../ix-api/tag.model';

/**
 * Data source for the table
 * @ignore
 */
export class TagTableDataSource extends DataSource<Tag> {

  /**
   * Data for table
   */
  public data: BehaviorSubject<Tag[]>;

  constructor() {
    super();
    this.data = new BehaviorSubject([]);
  }

  updateData(newData: Tag[]) {
    this.data.next(newData);
  }

  connect(collectionViewer: CollectionViewer): Observable<Tag[]> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
