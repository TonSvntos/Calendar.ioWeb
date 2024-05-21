import { IResult } from '../models/IResult';
import { IReturnFiles } from '../models/IReturnFiles';


export class CommonService {

  //#region IsNullOrEmpty

  StringIsNullOrEmptyOrUndefined(value: string): boolean {
    if (value !== null && value !== undefined && value.trim() !== "") {
      return false;
    }
    else {
      return true;
    }
  }

  ObjIsNullOrUndefined(value: any): boolean {
    if (value !== null && value !== undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  NumberIsNullOrUndefinedOrZero(value: number): boolean {
    if (value !== null && value !== undefined && value !== 0) {
      return false;
    }
    else {
      return true;
    }
  }
  //#endregion

  //#region IsEqual

  StringIsEqual(string1: string, string2: string) {
    if (string1 === string2) {
      return true;
    }
    else {
      return false;
    }
  }

  //#endregion

  //#region handling errors

  //#endregion

  //#region Validation
  ValidatePeriod(start: Date, end: Date, fieldDescription: string): string {
    let msg = "";
    if (start !== null || end !== null) {
      if (start === null || end === null) {
        msg = "Please fill full " + fieldDescription + " search period";
      }
      else if (start > end) {
        msg = "Final " + fieldDescription + " must be greater then Initial " + fieldDescription + ".";
      }
    }
    return msg;
  }
  //#endregion

  //#region Excel Download
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  DownloadExcel(data) {
    let fileType = ".xlsx";
    let contentType = "application/octet-stream";
    this.Download(data, fileType, contentType);
  }
  //#endregion

  DownloadFile(data) {
    let fileType = ".txt";
    let contentType = "text/plain";
    this.Download(data, fileType, contentType);

  }

  Download(data, fileType, contentType) {

    let retorno = data.data as IReturnFiles;
    if (retorno?.content !== undefined && retorno.content !== '') {

      let blob2 = this.b64toBlob(retorno.content, contentType, 512);
      let fileURL = URL.createObjectURL(blob2);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = fileURL;
      a.target = "_blank";
      a.download = retorno.nmFile + fileType;
      a.click();
      a.remove();
    }

  }
  UniqueBy(arr, prop) {
    return arr.reduce((a, d) => {
      if (!a.includes(d[prop])) {
        a.push(d[prop]);
      }
      return a;
    }, []);
  }
}
