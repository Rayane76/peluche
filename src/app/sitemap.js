export default async function sitemap() {

    const result = await fetch(`${process.env.WEBSITE_URL}/api/categorie/getCategoriesNoQuery`)

    const res = await fetch(`${process.env.WEBSITE_URL}/api/product/getLastProducts`)

    const articles = await res.json();

    const categories = await result.json();

    const categoriesEntries = categories.data.map((categorie)=>({
        url: `${process.env.WEBSITE_URL}/${categorie.gender}/${categorie.name}`,
        lastModified:  categorie.updatedAt,
        priority: 0.8
    }))

    const articlesEntries = articles.data.map((article)=> ({
        url: `${process.env.WEBSITE_URL}/articles/${article.name}/${article._id}`,
        lastModified: article.updatedAt,
        priority: 0.8
    }))
 

    return [
        {
            url: `${process.env.WEBSITE_URL}`,
            priority: 1
        },
        {
            url: `${process.env.WEBSITE_URL}/check`,
            priority: 0.2
        },
        {
            url: `${process.env.WEBSITE_URL}/Men`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/Women`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/Unisex`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/Kids`,
            priority: 0.9
        },
        {
            url: `${process.env.WEBSITE_URL}/newArrivals`,
            priority: 0.9
        },
        ...categoriesEntries,
        ...articlesEntries

    ]
}