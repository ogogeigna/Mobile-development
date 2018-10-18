// Interface -> used to fetch data
// 对应数据库中数据 quotes[]

export interface Quote {
    id: string;
    person: string;
    text: string;
}