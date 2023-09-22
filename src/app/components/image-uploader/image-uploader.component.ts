import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @Input() docRef: any;
  @Input() text: string = 'Click to upload';
  @Input() fileType: string = '';
  @Output() downloadUrl = new EventEmitter<{ file: any; url: string }>();
  @Output() filePreview = new EventEmitter<string>();

  loading: boolean = false;
  selectedFile: File | null = null;
  newFileSelected: boolean = false; // New flag to check whether a new file has been selected or not

  @Input() filename: string | null = null;

  private storage = getStorage(getApp());

  constructor(private cd: ChangeDetectorRef) {}

  hasFile(): boolean {
    return !!this.filename; // This will return true if this.selectedFile is not null or undefined, else false
  }

  upload(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.filename = this.selectedFile.name;
      this.newFileSelected = true; // Set the flag to true when a new file is selected

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePreview.emit(event.target.result); // Emit the data URL of the selected file
      };
      reader.readAsDataURL(this.selectedFile); // Convert the selected file to a Data URL
    }
  }

  async startUpload() {
    if (!this.selectedFile) {
      return;
    }

    this.loading = true;
    const filepath = this.docRef + this.selectedFile.name;
    const fileRef = ref(this.storage, filepath);

    try {
      await uploadBytes(fileRef, this.selectedFile);
      const url = await getDownloadURL(fileRef);
      this.downloadUrl.emit({ file: this.selectedFile, url: url });
      this.newFileSelected = false; // Reset the flag after a successful upload
    } catch (error) {
      console.error('Error during upload process:', error);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }
}
