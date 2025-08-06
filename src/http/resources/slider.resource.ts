import Resource from "frexp/lib/Resource";

export default class sliderResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      title: this.title,
      caption: this.caption,
      imageUrl: `${process.env.BASE_URL}${this.imageUrl}`,
      link: `${process.env.BASE_URL}${this.imageUrl}`,
      sortOrder: +this.sortOrder,
      status: this.status,
    };
  }
}
