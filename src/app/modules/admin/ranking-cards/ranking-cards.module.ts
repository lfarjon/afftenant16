import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingCardsComponent } from './ranking-cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [RankingCardsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QuillModule,
    MatDialogModule,
    ComponentsModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
  ],
  exports: [RankingCardsComponent],
})
export class RankingCardsModule {}
