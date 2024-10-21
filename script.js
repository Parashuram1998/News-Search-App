const apiKey = '5d823b877f8640c88fe9a289303f545c';

const blogContainer = document.getElementById('blog-container');
let searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews(searchInput){
    try{
        let apiUrl;
        if(searchInput.value == ""){
            apiUrl = `https://newsapi.org/v2/everything?q=maharashtra&pagesize=12&apiKey=${apiKey}`;    
        }else{
            apiUrl = `https://newsapi.org/v2/everything?q=${searchInput}&pagesize=12&apiKey=${apiKey}`;
        }        
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching news", error);
        return null;
    }
}

searchButton.addEventListener('click', async () => {
    try{
        const news = await fetchRandomNews(searchInput.value);
        displayNews(news);
        searchInput.value = '';
    }catch(error){
        console.error("Error fetching news", error);
    }
});

function displayNews(news){

    blogContainer.innerHTML = '';

    news.forEach((article) => {  
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const blogImage = document.createElement('img');
        blogImage.src = article.urlToImage;
        blogImage.alt = article.title;

        const blogTitle = document.createElement('h2');
        const truncatedBlogTitle = article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title;
        blogTitle.textContent = truncatedBlogTitle;

        const blogDescription = document.createElement('p');
        const truncatedBlogDescription = article.description.length > 120 ? article.description.substring(0, 120) + '...' : article.description;
        blogDescription.textContent = truncatedBlogDescription;

        blogCard.appendChild(blogImage);
        blogCard.appendChild(blogTitle);
        blogCard.appendChild(blogDescription);
        blogContainer.appendChild(blogCard);

        blogCard.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
     });
}     

(async() => {
    try{
        const news = await fetchRandomNews(searchInput);
        displayNews(news);
    }catch(error){
        console.error("Error fetching news", error);
    }
})();