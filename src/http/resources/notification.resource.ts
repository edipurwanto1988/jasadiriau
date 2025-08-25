import Resource from "frexp/lib/Resource";

export default class NotificationResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      title: this.title,
      message: this.message,
      isRead: !!this.isRead,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${this.url}`,
      type: this.type,
      createdAt: this.createdAt,
    };
  }
}
