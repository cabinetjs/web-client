import { MinimalAttachmentFragment } from "@apollo/queries";
import { Nullable } from "@utils/types";

export function getThumbnailUrl(attachment: Nullable<MinimalAttachmentFragment>, widthOrSize: number, height?: number) {
    if (!attachment) {
        return null;
    }

    const tokens = [widthOrSize];
    if (!!height) {
        tokens.push(height);
    }

    return `http://localhost:4000/thumbnails/${attachment.uid}/${tokens.join("/")}`;
}

export function getAttachmentUrl(attachment: Nullable<MinimalAttachmentFragment>) {
    if (!attachment) {
        return null;
    }

    return `http://localhost:4000/attachments/${attachment.id}`;
}
