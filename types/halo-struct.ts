export interface Post {
  spec: {
    categories: string[]
    deleted: boolean
    slug: string
    tags: string[]
    title: string
    releaseSnapshot: string
    publishTime: string
  }
  metadata: {
    name: string
  }
}
