import Resource from "frexp/lib/Resource";

export default class AdvantageResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      title: this.title,
      description: this.description,
      icon: this.icon,
      sortOrder: this.sortOrder,
      status: this.status,
    };
  }
}
