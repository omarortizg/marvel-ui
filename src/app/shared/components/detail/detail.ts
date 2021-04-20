export interface ItemDetail {
    title: string;
    thumbnail: Thumbnail;
    description: string;
    collectionList: ItemDetailCollection[];
}

interface Thumbnail {
    path: string;
    extension: string;
}

interface ItemDetailCollection {
    name: string;
    path: string;
    itemList: any[];
}
