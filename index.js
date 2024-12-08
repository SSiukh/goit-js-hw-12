import{a as h,i as u,S as p}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();async function y(t,o){const r="32946561-6d99391fd6ee776d2dee61275";try{return(await h.get("https://pixabay.com/api/",{params:{key:r,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(i){console.log(i)}}function f(t){return t.map(({largeImageURL:o,webformatURL:r,tags:i,likes:e,views:a,comments:l,downloads:m})=>`
        <li class="gallery-item">
            <a href="${o}"><img class="gallery-image" src="${r}" alt="${i}"></a>
            <div class="gallery-info">
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Likes</p>
                    <p class="gallery-info-div-value">${e}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Views</p>
                    <p class="gallery-info-div-value">${a}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Comments</p>
                    <p class="gallery-info-div-value">${l}</p>
                </div>
                <div class="gallery-info-div">
                    <p class="gallery-info-div-text">Downloads</p>
                    <p class="gallery-info-div-value">${m}</p>
                </div>
            </div>
        </li>
    `).join("")}const v=document.querySelector(".form"),g=document.querySelector(".gallery"),n=document.querySelector(".loader"),c=document.querySelector(".load-more");c.classList.replace("load-more","visually-hidden");let d="",s=1;v.addEventListener("submit",L);c.addEventListener("click",b);async function L(t){if(c.classList.replace("load-more","visually-hidden"),t.preventDefault(),s=1,d=t.target.elements.formInput.value.trim(),n.classList.remove("visually-hidden"),g.innerHTML="",!d){u.show({message:"Please enter a search term.",backgroundColor:"#ef4040",position:"topRight"}),n.classList.add("visually-hidden");return}const o=await y(d,s);try{const r=Math.ceil(o.totalHits/20);if(!o.hits.length)throw new Error("Sorry, there are no images matching <br /> your search query. Please try again!");const i=f(o.hits);g.innerHTML=i,new p(".gallery a",{captionSelector:"img",captionsData:"alt",captionPosition:"bottom"}).refresh(),s<r&&c.classList.replace("visually-hidden","load-more")}catch(r){u.show({message:r.message,backgroundColor:"#ef4040",position:"topRight"})}finally{n.classList.add("visually-hidden")}t.target.reset()}async function b(){s++,n.classList.remove("visually-hidden");try{const t=await y(d,s),o=f(t.hits);g.insertAdjacentHTML("beforeend",o);const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"});const i=Math.ceil(t.totalHits/20);s>=i&&(c.classList.replace("load-more","visually-hidden"),u.show({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#ef4040",position:"topRight"})),new p(".gallery a",{captionSelector:"img",captionsData:"alt",captionPosition:"bottom"}).refresh(),n.classList.add("visually-hidden")}catch(t){console.log(t.message)}}
//# sourceMappingURL=index.js.map
