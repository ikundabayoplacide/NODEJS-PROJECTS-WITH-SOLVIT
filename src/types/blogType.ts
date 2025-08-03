
export type BlogType={
    _id:number;
    title:string;
    description:string;
    slug:string;
    content:string;
    author:string;
    is_published:string;
    created_at:string;
    updated_at:string;
    deleted_at:null|undefined|string;
    comment:number,
    likes:number

}
export interface interfaceAddBlog extends Omit<BlogType,'id'>{}
export interface GetallBlog{
    blogs:BlogType[]
}
