
export type BlogType={
    id:number;
    name:string;
    title:string;
    photo:string;
    description:string
}
export interface GetAllBlogs{
    blogs:BlogType[]
}