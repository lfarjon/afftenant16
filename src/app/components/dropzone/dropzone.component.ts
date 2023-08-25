import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getApp } from 'firebase/app';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DropzoneComponent implements OnInit, OnChanges {
  @Input() docRef: any;
  @Input() height: string = 'h-64';
  @Input() width: string = 'w-full';
  @Input() text: string = 'Click to upload';
  @Input() fileType: string = '';
  @Output() downloadUrl = new EventEmitter<{ file: any; url: string }>();
  loading: boolean = false;

  private storage = getStorage(getApp());

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['docRef']) {
    //   console.log('docRef changed:', changes['docRef'].currentValue);
    // }
  }

  async upload(event: any) {
    this.loading = true;
    const file = event.target.files[0];
    const filepath = this.docRef + file.name;

    const fileRef = ref(this.storage, filepath);
    console.log(fileRef);
    try {
      await uploadBytes(fileRef, file);
    } catch (uploadError) {
      console.error('Error uploading file:', uploadError);
    }

    try {
      const url = await getDownloadURL(fileRef);
      this.downloadUrl.emit({ file: file, url: url });
    } catch (downloadError) {
      console.error('Error retrieving the URL:', downloadError);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }
}
