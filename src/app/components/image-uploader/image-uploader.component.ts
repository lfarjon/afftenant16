import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @ViewChild('uploader') uploader!: ElementRef;

  @Input() docRef: any;
  @Input() text: string = 'Click to upload';
  @Input() fileType: string = '';
  @Input() style: string = '';
  @Input() filename: string | null = null;
  @Output() downloadUrl = new EventEmitter<{ file: any; url: string }>();
  @Output() filePreview = new EventEmitter<string>();
  @Output() fileEvent = new EventEmitter<any>();

  loading: boolean = false;
  selectedFile: File | null = null;
  newFileSelected: boolean = false; // New flag to check whether a new file has been selected or not

  private storage = getStorage(getApp());

  constructor(private cd: ChangeDetectorRef) {}

  hasFile(): boolean {
    return !!this.filename; // This will return true if this.selectedFile is not null or undefined, else false
  }

  triggerFileInputClick() {
    this.uploader.nativeElement.click();
  }

  upload(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileEvent.emit({
        file: this.selectedFile,
        newFileSelected: true,
      });
      this.filename = this.selectedFile.name;
      this.newFileSelected = true; // Set the flag to true when a new file is selected

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePreview.emit(event.target.result); // Emit the data URL of the selected file
      };
      reader.readAsDataURL(this.selectedFile); // Convert the selected file to a Data URL
    }
  }

  async startUpload(file?: File) {
    if (!this.selectedFile && !file) {
      return;
    }

    let selectedFile: File | undefined = this.selectedFile || file;

    this.loading = true;
    const filepath = this.docRef + selectedFile?.name;
    console.log('Filepath:', filepath);
    console.log('DocRef:', this.docRef);
    console.log('SelectedFile:', selectedFile);
    const fileRef = ref(this.storage, filepath);

    try {
      await uploadBytes(fileRef, selectedFile!);
      const url = await getDownloadURL(fileRef);
      this.downloadUrl.emit({ file: selectedFile, url: url });
      this.newFileSelected = false; // Reset the flag after a successful upload
      selectedFile = undefined;
    } catch (error) {
      console.error('Error during upload process:', error);
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }
}
