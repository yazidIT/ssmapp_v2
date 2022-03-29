export interface INewsResultData {
    channel: IChannelItem
}

export interface IChannelItem {
    title: string
    link: string
    description: string
    lastBuildDate: string
    generator: string
    ttl: string
    language: string
    item: Array<INewsItem>
}

export interface INewsItem {
    title: string
    link: string
    description: string
    author: string
    pubDate: string
    guid: string
    id: string
    link_id: string
}
