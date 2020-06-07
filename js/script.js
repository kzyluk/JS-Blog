'use strict';
/* 
document.getElementById("test-button").addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links', links);
});
*/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const attribute = clickedElement.getAttribute('href');
  //console.log(attribute);

  /* find the correct article using the selector (value of 'href' att */
  const article = document.querySelector(attribute);
  //console.log(article);
  /* add class 'active' to the correct article */
  article.classList.add('active');
};


 
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorTagSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = (document.querySelector(optTitleListSelector));
    
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
        
  for (let article of articles) {
    //console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* get the title from the title element */
    //above

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);  
      
    /* insert link into titleList */
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
}
generateTitleLinks();


const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagWrapp = article.querySelector(optArticleTagsSelector);
    //console.log(tagWrapp);

    /*   make html variable with empty string */
    let html = ''

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      //console.log(tag);
      /*generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+ tag +'">'+ tag + "&nbsp" + "&nbsp" +'</a></li>'
      //console.log(linkHTML); 
      /*add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapp.innerHTML = html;
    /* END LOOP: for every article: */
  }}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value o */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the*/
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" consta*/
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" con*/
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as a*/
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
  for (let link of links) {
    link.addEventListener('click',tagClickHandler);
  }
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors (){
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapp = article.querySelector(optAuthorTagSelector);
    //console.log(authorWrapp);
    const authorTags = article.getAttribute('data-author');
    //console.log(html);
    const linkHTML = '<a href="#">' + authorTags +'</a>'
    //const linkHTML = authorTags;
    authorWrapp.innerHTML = linkHTML;  
  }
}
generateAuthors ();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href')
}