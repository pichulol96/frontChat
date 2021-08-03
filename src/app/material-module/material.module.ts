import {NgModule} from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

@NgModule({
	imports:[
	MatSliderModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
    MatSidenavModule,
	MatMenuModule,
	MatListModule,
	MatTableModule,
	MatDialogModule,
	MatInputModule,
	MatBadgeModule,
	MatProgressSpinnerModule,
	MatProgressBarModule

	],
	exports:[
	MatSliderModule,
	MatToolbarModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
    MatSidenavModule,
	MatMenuModule,
	MatListModule,
	MatTableModule,
	MatDialogModule,
	MatInputModule,
	MatBadgeModule,
	MatProgressSpinnerModule,
	MatProgressBarModule
	]

})
export class MaterialModule{

}