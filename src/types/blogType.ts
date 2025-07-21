
export type BlogType={
    _id:number;
    title:string;
    description:string;
    slug:string;
    content:string;
    author:string;
    isPublished:string;
    createdAt:string;
    updatedAt:string;
    deletedAt:null|undefined|string;
    comment:number,
    likes:number

}
export interface interfaceAddBlog extends Omit<BlogType,'id'>{}
export interface GetallBlog{
    blogs:BlogType[]
}
