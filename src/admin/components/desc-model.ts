export class DescModel {
  public desc: string;
  public imgUrl1: string;
  public imgUrl2: string;

  constructor(jsonStr?: string) {
    let json = JSON.parse(jsonStr!);
    this.desc = json["desc"];
    this.imgUrl1 = json["img1"];
    this.imgUrl2 = json["img2"];
  }
}

