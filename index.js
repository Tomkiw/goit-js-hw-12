import{a as S,S as q,i}from"./assets/vendor-DvfmeZXB.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();async function u(r,n){const e="54182222-bc9f62244d35838f397753c37",o="https://pixabay.com/api/",t={params:{key:e,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:15}};return(await S.get(o,t)).data}let v=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),p=document.querySelector(".btn-load-more");function f(r){const n=r.map(e=>`<li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${e.webformatURL}" 
          alt="${e.tags}" 
        />
      </a>

      <div class="inf-container">
  <ul class="inf-list">
    <li class="inf-item">
      <h3>Likes</h3>
      <span>${e.likes}</span>
    </li>

     <li class="inf-item">
      <h3>Views</h3>
      <span>${e.views}</span>
    </li>

     <li class="inf-item">
      <h3>Comments</h3>
      <span>${e.comments}</span>
    </li>

     <li class="inf-item">
      <h3>Downloads</h3>
      <span>${e.downloads}</span>
    </li>

  </ul>
</div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",n),v.refresh()}function P(){m.innerHTML=""}const g=()=>{h.classList.remove("is-hidden")},y=()=>{h.classList.add("is-hidden")},L=()=>{p.classList.remove("is-hidden")},l=()=>{p.classList.add("is-hidden")},d=document.querySelector(".form"),M=document.querySelector(".btn-load-more");let a=1,w="";const b=15;d.addEventListener("submit",async r=>{r.preventDefault();const e=r.target.querySelector("input").value.trim();if(w=e,!e){i.warning({title:"Warning",message:"Please enter a search query!"});return}P(),g(),l(),a=1;try{const o=await u(e,a);if(o.hits.length===0){l(),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(o.hits),o.totalHits>b?L():l(),a+=1}catch(o){console.error(o),i.error({message:"Something went wrong! Please try again later.",position:"topRight"})}finally{y(),d.reset()}});M.addEventListener("click",async()=>{l(),g();try{const r=await u(w,a);f(r.hits),document.querySelector(".gallery-item").getBoundingClientRect().height;const e=Math.ceil(r.totalHits/b);a>=e?(l(),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(L(),a+=1)}catch(r){console.error(r),i.error({position:"topRight",message:"Something went wrong!"})}finally{y()}});
//# sourceMappingURL=index.js.map
