import { NgModule } from '@angular/core';
import { SortPipe } from './sort/sort';
import { MypostsPipe } from './myposts/myposts';
@NgModule({
	declarations: [SortPipe,
    MypostsPipe],
	imports: [],
	exports: [SortPipe,
    MypostsPipe]
})
export class PipesModule {}
