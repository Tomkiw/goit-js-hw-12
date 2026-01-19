import{a as S,S as v,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();async function h(r,i){const t="54182222-bc9f62244d35838f397753c37",o="https://pixabay.com/api/",e={params:{key:t,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:15}};return(await S.get(o,e)).data}let q=new v(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),f=document.querySelector(".btn-load-more");function g(r){const i=r.map(t=>`<li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${t.webformatURL}" 
          alt="${t.tags}" 
        />
      </a>

      <div class="inf-container">
  <ul class="inf-list">
    <li class="inf-item">
      <h3>Likes</h3>
      <span>${t.likes}</span>
    </li>

     <li class="inf-item">
      <h3>Views</h3>
      <span>${t.views}</span>
    </li>

     <li class="inf-item">
      <h3>Comments</h3>
      <span>${t.comments}</span>
    </li>

     <li class="inf-item">
      <h3>Downloads</h3>
      <span>${t.downloads}</span>
    </li>

  </ul>
</div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",i),q.refresh()}function P(){m.innerHTML=""}const y=()=>{p.classList.remove("is-hidden")},d=()=>{p.classList.add("is-hidden")},L=()=>{f.classList.remove("is-hidden")},l=()=>{f.classList.add("is-hidden")},u=document.querySelector(".form"),R=document.querySelector(".btn-load-more");let a=1,w="";const b=15;u.addEventListener("submit",async r=>{r.preventDefault();const t=r.target.querySelector("input").value.trim();if(w=t,!t){n.warning({title:"Warning",message:"Please enter a search query!"});return}P(),y(),l(),a=1;try{const o=await h(t,a);if(o.hits.length===0){l(),n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(o.hits),o.totalHits>b?L():(l(),n.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),a+=1}catch(o){console.error(o),n.error({message:"Something went wrong! Please try again later.",position:"topRight"})}finally{d(),u.reset()}});R.addEventListener("click",async()=>{l(),y();try{const r=await h(w,a);g(r.hits),d();const i=Math.ceil(r.totalHits/b);a>=i?(l(),n.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(L(),a+=1);const o=document.querySelector(".gallery-item").getBoundingClientRect().height;setTimeout(()=>{window.scrollBy({top:o*2,behavior:"smooth"})},500)}catch(r){console.error(r),n.error({position:"topRight",message:"Something went wrong!"})}finally{d()}});
//# sourceMappingURL=index.js.map
