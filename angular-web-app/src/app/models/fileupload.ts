export class FileUpload {
  key: string;
  name: string;
  url: string;
  added: number;
  edited: number;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}