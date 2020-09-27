const updateModal = (articleHead, articleContent) => {
    document.getElementById("articleHead").innerHTML = articleHead;
    document.getElementById("articleContent").innerHTML = articleContent;
};

window.onload = () => {
    const articles = document.getElementsByClassName("article-card");
    
    articles.forEach(article => {
        const flag = article.getElementsByClassName("hidden")[0].innerHTML;
        const actionButtons = article.getElementsByClassName("actionButton");
        if (flag == 1) {
            article.getElementsByClassName("article-title")[0].style.backgroundColor = "#00aa00";
            if (actionButtons.length != 0)
                actionButtons[0].style.display = 'none';
        }
        else if (flag == 0) {
            article.getElementsByClassName("article-title")[0].style.backgroundColor = "#aa0000";
            if (actionButtons.length != 0)
                actionButtons[1].style.display = 'none';
        }
            
    });
};